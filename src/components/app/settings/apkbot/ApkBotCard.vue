<template>
  <div v-if="serviceReady">
    <v-data-table class="table"
                  :headers="headers"
                  :items="user?.devices || []"
                  hide-default-header
                  hide-default-footer
                  :loading="useConstStore().isLoading"
    >
      <template v-slot:top>
        <v-toolbar flat density="compact" rounded="shaped">
          <v-toolbar-title>
            <v-icon
                color="medium-emphasis"
                icon="mdi-book-multiple"
                size="x-small"
                start
            ></v-icon>
            Доступные mac-адреса
          </v-toolbar-title>

          <v-btn
              class="me-2"
              prepend-icon="mdi-plus"
              rounded="shaped"
              text="Add a Mac"
              border
              @click="add"
          ></v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon
              color="medium-emphasis"
              icon="mdi-pencil"
              size="small"
              @click="edit(item.id)"
          ></v-icon>

          <v-icon
              color="medium-emphasis"
              icon="mdi-delete"
              size="small"
              @click="remove(item.id)"
          ></v-icon>
        </div>
      </template>

      <template v-slot:no-data>
        <v-btn
            prepend-icon="mdi-backup-restore"
            rounded="lg"
            text="Reset data"
            variant="text"
            border
            @click="reset"
        ></v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogVisible" max-width="500">
        <v-card rounded="lg" class="dialog"
                :subtitle="`${isEditing ? 'Обновить' : 'Создать'} новый мак-адрес`"
                :title="`${isEditing ? 'Обновление' : 'Создание'} Адреса`"
        >
          <template v-slot:text>
            <v-text-field
                label="Название"
                ref="device-name"
                variant="outlined"
                density="comfortable"
                bg-color="transparent"
                clearable
                :maxlength="useConstStore().const.identifierMaxLength"
                v-model.trim="this.dialogModel.description"
                :rules="[useConstStore().rules.required]"
            ></v-text-field>
            <v-text-field
                label="Mac-адрес"
                ref="device-mac"
                variant="outlined"
                density="comfortable"
                bg-color="transparent"
                clearable
                :maxlength="useConstStore().const.identifierMaxLength"
                v-model.trim="this.dialogModel.macAddress"
                :rules="[useConstStore().rules.required, useConstStore().rules.macAddress]"
                append-inner-icon="mdi-update"
                @click:append-inner="this.dialogModel.macAddress = generateRandomMac()"
            ></v-text-field>
          </template>

          <v-divider></v-divider>

          <div class="sections-row">
            <v-btn
                class="btn-save"
                text="Отмена"
                variant="plain"
                @click="dialogVisible = false"
                width="50%"/>
            <v-btn
                class="btn-cancel"
                text="Сохранить"
                width="50%"
                @click="save"/>
          </div>
        </v-card>
    </v-dialog>
  </div>
  <div v-else>
    <v-card-subtitle>Service unavailable</v-card-subtitle>
  </div>

</template>

<script>
import akpbotService from "@/components/app/settings/apkbot/akpbot.service.js";
import {useConstStore} from "@/stores/const.js";

export default {
  name: "ApkBotCard",
  data() {
    return {
      serviceReady: false,
      dialogVisible: false,
      dialogModel: this.createEmptyDevice(),
      isEditing: false,
      user: {},
      headers: [
        {title: 'Description', key: 'description', align: 'start'},
        {title: 'Mac', key: 'macAddress', align: 'start'},
        {title: 'Actions', key: 'actions', align: 'end', sortable: false},
      ]
    }
  },
  methods: {
    useConstStore,
    async reset() {
      await akpbotService.get().then(response => {
        if (response) {
          this.serviceReady = true
          this.user = response.response
        } else {
          this.serviceReady = false
        }
      })
    },
    add() {
      this.dialogModel = this.createEmptyDevice()
      this.dialogVisible = true
    },
    edit(id) {
      this.isEditing = true
      let device = this.user.devices.find(device => device.id === id)
      this.dialogModel = {
        id: device.id,
        description: device.description,
        macAddress: device.macAddress
      }
      this.dialogVisible = true
    },
    remove(id) {
      akpbotService.deleteDevice(id).then(response => {
        this.closeDialog()
      })
    },
    save() {
      if (this.isEditing) {
        akpbotService.updateDevice(this.dialogModel).then(response => {
          this.closeDialog()
        })
      } else {
        akpbotService.createDevice(this.dialogModel).then(response => {
          this.closeDialog()
        })
      }
    },

    closeDialog() {
      this.reset().then(response => {
        this.isEditing = false
        this.dialogVisible = false
      })
    },
    createEmptyDevice() {
      return {
        id: 0,
        description: '',
        macAddress: ''
      }
    },
    generateRandomMac() {
      return Array.from({length: 6}, () =>
          Math.floor(Math.random() * 256)
              .toString(16)
              .toLowerCase()
              .padStart(2, '0')
      ).join(':');
    },
  },
  async mounted() {
    await this.reset()
  }
}
</script>

<style scoped lang="sass">
@use '@/styles/variables' as var

.table
  background-color: var.$background03

.v-card
    padding: 10px

.btn-save
  background-color: var.$warning
  margin-right: 0
  margin-left: 0

.btn-cancel
  background-color: var.$success
  margin-right: 0
  margin-left: 0
</style>