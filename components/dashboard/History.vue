<template>
  <div>
    <v-container v-if="!errors">
      <v-data-table
        :headers="headers"
        :items="history"
        sort-by="order"
        :calculate-widths="true"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>History</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="orange"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.order"
                          label="Order"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.color"
                          label="Color"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.year"
                          label="Year"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.title"
                          label="Title"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          v-model="editedItem.description"
                          label="Description"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-container>
    <v-container v-else>
      <h1>Error occured try again</h1>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  async fetch() {
    if (this.history.length) return
    try {
      const response = await axios.get(`${process.env.API}/history`)
      this.$store.commit('user/addHistory', response.data)
    } catch (error) {
      this.errors = true
    }
  },
  data() {
    return {
      errors: false,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'order',
          align: 'start',
          value: 'order',
          width: 100,
        },
        { text: 'Color', value: 'color', width: 100 },
        { text: 'Year', value: 'year', width: 150 },
        { text: 'Title', value: 'title' },
        {
          text: 'Description',
          value: 'description',
          sortable: false,
          width: 1000,
        },
        { text: 'Actions', value: 'actions', sortable: false, width: 100 },
      ],
      editedIndex: -1,
      editedItem: {
        order: '',
        color: '',
        year: '',
        title: '',
        description: '',
      },
      defaultItem: {
        order: '',
        color: '',
        year: '',
        title: '',
        description: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      history: 'user/getHistory',
    }),
    formTitle() {
      // smart, so can simply check here what the title of the popup module should be. In this case, if the item selected already exists (has an index other then -1) use it is an edit form, otherwse it is a new item
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.history.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.history.indexOf(item)
      console.log(item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      const { _id } = this.history[this.editedIndex]
      this.$store.dispatch('user/deleteHistoryItem', {
        index: this.editedIndex,
        _id,
      })
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save() {
      if (this.editedIndex > -1) {
        this.$store.dispatch('user/updateHistoryItem', {
          index: this.editedIndex,
          item: this.editedItem,
        })
      } else {
        this.$store.dispatch('user/addHistoryItem', this.editedItem)
      }
      this.close()
    },
  },
}
</script>
