var app = new Vue({
  el: '#root',
  data: {
    name:'',
    username: '',
    password: '',
    email: ''
  },
  methods: {
    login: function (e) {
      e.preventDefault()
      axios.post('http://localhost:3000/login',
      {
        username: app.username,
        password: app.password,
      }).then(function (res) {
        if(res.data.token){
          localStorage.setItem("userid",res.data.userid)
          localStorage.setItem("username",res.data.username)
          localStorage.setItem("token", res.data.token)
          window.location.href = 'http://127.0.0.1:8080/'
        }else{
          swal(res.data)
        }
        app.resetButton()
      })
    },
    register: function(e) {
      e.preventDefault()
      axios.post('http://localhost:3000/register',
      {
        name: app.name,
        username: app.username,
        password: app.password,
        email: app.email
      }).then(function (res) {
        if(res.data.username == app.username){
          swal("Good job!", "You Account Has Been Created!", "success")
        }else{
          swal(res.data)
        }
        app.resetButton()
      })
    },
    resetButton: function() {
      app.name = ''
      app.username = ''
      app.password = ''
      app.email = ''
    }
  }
})
