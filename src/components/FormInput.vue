<template>
  <div class="content">
    <div class="container">
      <div class="row align-items-stretch justify-content-center no-gutters">
        <div class="col-md-10">
          <div class="form h-100 contact-wrap p-5">
            <h3 class="text-center mb-4">Router Reboot</h3>
            <form>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="By IP" name="first">
                  <div class="row">
                    <div class="col-md-6 form-group mb-3">
                      <label for="" class="col-form-label">IP</label>
                      <input
                        class="form-control"
                        placeholder="e.g. 192.168.1.1"
                        v-model="ip"
                      />
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label for="" class="col-form-label">Port</label>
                      <input
                        class="form-control"
                        placeholder="e.g. 443"
                        v-model="port"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 form-group mb-3">
                      <label for="budget" class="col-form-label">User</label>
                      <input class="form-control" v-model="user" />
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label for="message" class="col-form-label"
                        >Password</label
                      >
                      <input
                        class="form-control"
                        v-model="password"
                        type="password"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 form-group" style="height: 80px">
                      <input type="checkbox" v-model="isSpecificTime" />
                      <label
                        for="budget"
                        class="col-form-label"
                        @click="isSpecificTime = !isSpecificTime"
                        >Specific Time</label
                      >
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label
                        for="budget"
                        class="col-form-label"
                        style="display: block"
                        >Time</label
                      >
                      <date-picker
                        v-model="time"
                        type="datetime"
                        placeholder="Select datetime"
                        v-if="isSpecificTime"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-type="format"
                      ></date-picker>
                      <input
                        class="form-control"
                        placeholder="Reboot every (1 - 23) hour"
                        v-model="time"
                        type="number"
                        v-else
                      />
                    </div>
                  </div>
                  <div class="text-center mb-4">
                    <vue-good-table
                      :columns="columns"
                      :rows="listScheduler"
                      max-height="500px"
                      :fixed-header="true"
                      :search-options="tableSearch"
                      :pagination-options="tablePagination"
                    />
                  </div>
                  <div class="row justify-content-center">
                    <div class="col-md-5 text-center">
                      <input
                        type="submit"
                        value="Reboot"
                        class="btn btn-block btn-primary rounded-0 py-2 px-4"
                        @click="checkForm"
                      />
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="By File" name="second">
                  <div class="text-center mb-4">
                    <vue-good-table
                      :columns="secondColumns"
                      :rows="listFileUploaded"
                      max-height="500px"
                      :fixed-header="true"
                      :search-options="tableSearch"
                      :pagination-options="tablePagination"
                    />
                  </div>
                  <div class="row justify-content-center">
                    <div class="col-md-5 text-center">
                      <input
                        type="submit"
                        value="Choose file"
                        class="btn btn-block btn-primary rounded-0 py-2 px-4"
                        @click="openSelect()"
                      />
                      <input
                        type="file"
                        accept=".xlsx,.csv"
                        id="selectfilereport"
                        ref="file"
                        v-on:change="handleFileUpload()"
                        style="display: none"
                      />
                    </div></div
                ></el-tab-pane>
              </el-tabs>
            </form>

            <div id="form-message-warning mt-4"></div>
            <div id="form-message-success">
              Your message was sent, thank you!
            </div>
          </div>
        </div>
      </div>
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { VueGoodTable } from 'vue-good-table'

export default {
  components: { Loading, DatePicker, VueGoodTable },
  name: 'FormInput',
  data () {
    return {
      ip: '',
      port: '',
      user: '',
      password: '',
      time: '',
      server_ip: 'http://103.229.42.221:9498',
      isSpecificTime: false,
      isLoading: false,
      file: '',
      activeName: 'first',
      listScheduler: [],
      listFileUploaded: [],
      columns: [
        {
          label: 'IP',
          field: 'ip'
        },
        {
          label: 'Schedule',
          field: 'schedule'
        }
      ],
      secondColumns: [
        {
          label: 'ID',
          field: 'id'
        },
        {
          label: 'IP',
          field: 'ip'
        },
        {
          label: 'Port',
          field: 'port'
        },
        {
          label: 'Reboot Info',
          field: 'reboot_info'
        },
        {
          label: 'Hardware Version',
          field: 'hver'
        },
        {
          label: 'Software Version',
          field: 'sver'
        },
        {
          label: 'Up Time',
          field: 'uptime'
        }
      ],
      tableSearch: {
        enabled: true,
        placeholder: 'Search this table'
      },
      tablePagination: {
        enabled: true,
        mode: 'pages',
        perPage: 10,
        perPageDropdown: [10, 15, 20]
      }
    }
  },
  mounted () {
    this.getListSchedule()
  },
  methods: {
    checkForm (e) {
      this.isLoading = true
      axios
        .get(`${this.server_ip}/reboot`, {
          params: {
            ip: this.ip,
            port: this.port,
            user: this.user,
            password: this.password,
            time: this.time
          }
        })
        .then((response) => {
          this.isLoading = false
          if (response.data === 'Failed') {
            this.$notify({
              group: 'form',
              title: 'Error',
              type: 'error'
            })
          } else {
            this.getListSchedule()
            this.$notify({
              group: 'form',
              title: response.data,
              type: 'success'
            })
          }
        })
        .catch((e) => {
          this.isLoading = false
          this.$notify({
            group: 'form',
            title: 'Error!',
            type: 'error'
          })
        })
      e.preventDefault()
    },
    getListSchedule () {
      axios.get(`${this.server_ip}/list_scheduler`).then((response) => {
        this.listScheduler = response.data
      })
    },
    getListUpload () {
      axios.get(`${this.server_ip}/list_upload`).then((response) => {
        this.listFileUploaded = response.data.map((item) => ({
          ...item,
          hver: item.status.hver,
          sver: item.status.sver,
          uptime: item.status.uptime
        }))
      })
    },
    async uploadFile () {
      this.loadfile = true
      let formData = new FormData()
      formData.append('file', this.file)
      try {
        this.isLoading = true
        axios.post(`${this.server_ip}/upload`, formData).then((response) => {
          this.isLoading = false
          console.log(response)
          if (response.data.success) {
            this.$notify({
              group: 'form',
              title: 'Success',
              type: 'success'
            })
          } else {
            this.$notify({
              group: 'form',
              title: 'Error',
              type: 'error'
            })
          }
        })
      } catch (error) {
        this.isLoading = false

        this.$notify({
          group: 'form',
          title: 'Error',
          type: 'error'
        })
      }
    },
    openSelect () {
      document.getElementById('selectfilereport').click()
    },
    handleFileUpload () {
      this.file = document.getElementById('selectfilereport').files[0]
      this.uploadFile()
    },
    handleClick (tab) {
      if (tab.name === 'first') this.getListSchedule()
      else this.getListUpload()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
