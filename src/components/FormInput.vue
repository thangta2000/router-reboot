<template>
  <div class="content">
    <div class="container">
      <div class="row align-items-stretch justify-content-center no-gutters">
        <div class="col-md-7">
          <div class="form h-100 contact-wrap p-5">
            <h3 class="text-center mb-5">Router Reboot</h3>
            <form class="mb-5" @submit="checkForm">
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
                  <input
                    class="form-control"
                    v-model="user"
                  />
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="message" class="col-form-label">Password</label>
                  <input
                    class="form-control"
                    v-model="password"
                    type="password"
                  />
                </div>
              </div>

              <div class="row mb-5">
                <div class="col-md-12 form-group mb-3">
                  <label for="budget" class="col-form-label">Time</label>
                  <input
                    class="form-control"
                    placeholder="Reboot every (1 - 23) hour"
                    v-model="time"
                    type="number"
                  />
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="col-md-5 form-group text-center">
                  <input
                      type="submit"
                    value="Reboot"
                    class="btn btn-block btn-primary rounded-0 py-2 px-4"
                  />
                  <span class="submitting"></span>
                </div>
              </div>
            </form>

            <div id="form-message-warning mt-4"></div>
            <div id="form-message-success">
              Your message was sent, thank you!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FormInput',
  data () {
    return {
      ip: '',
      port: '',
      user: '',
      password: '',
      time: '',
      server_ip: 'http://103.229.42.221:9498'
    }
  },
  methods: {
    checkForm (e) {
      axios.get(`${this.server_ip}/reboot`, {params: {ip: this.ip, port: this.port, user: this.user, password: this.password, time: this.time}})
        .then(response => {
          if (response.data === 'Failed') {
            this.$notify({
              group: 'form',
              title: 'Error',
              type: 'error'
            })
          } else {
            this.$notify({
              group: 'form',
              title: 'Success',
              type: 'success'
            })
          }
        })
        .catch(e => {
          this.$notify({
            group: 'form',
            title: 'Error!',
            type: 'error'
          })
        })
      e.preventDefault()
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
