  var app = new Vue({
    el: '#root',
    data: {
      signin:{
        email: '',
        password: ''
      },
      signup: {
        email: '',
        password: '',
        name: ''
      },
      forums: [],
      token: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      userid: localStorage.getItem("userid")
    },
    methods: {
      login: function (e) {
        e.preventDefault()
        axios.post('http://localhost:3000/signin',
        {
          email: app.signin.email,
          password: app.signin.password,
        }).then(function (res) {
          if(res.data.token){
            localStorage.setItem("userid",res.data.userid)
            localStorage.setItem("name",res.data.name)
            localStorage.setItem("token", res.data.token)
            swal("Good job!", "You Have Already Sign in!", "success")
            window.location.href = 'http://localhost:8080/'
          }else{
            swal("Cek Your Credentials")
          }
          ;
          app.resetButton()
        })
      },
      register: function(e) {
        e.preventDefault()
        axios.post('http://localhost:3000/register',
        {
          name: app.signup.name,
          password: app.signup.password,
          email: app.signup.email
        }).then(function (res) {
          if(res.data.username == app.username){
            app.resetButton()
            swal("Good job!", "You Account Has Been Created!", "success")
          }else{
            swal(res.data)
          }
          app.resetButton()
        })
      },
      loginAPI: function() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', {
          fields: 'name, gender, email, picture'
        }, function(res) {
          axios.post('http://localhost:3000/registerFb',
          {
            name: res.name,
            image: res.picture.data.image,
            email: res.email
          }).then(function (result) {
            if(result.data.token){
              localStorage.setItem("userid",result.data.userid)
              localStorage.setItem("name",result.data.name)
              localStorage.setItem("token",result.data.token)
              swal("Good job!", "You Have Already Sign in!", "success")
              window.location.href = 'http://localhost:8080/'
            }else{
              swal(result.data)
            }
            app.resetButton()
          })
        });
      },
      resetButton: function() {
        app.signup.name = ''
        app.signup.password = ''
        app.signup.email = ''
        app.signin.email = ''
        app.signin.password = ''
      },
      getForum: function () {
        axios.get('http://localhost:3000/api/forum'
      ).then(function (res) {
        app.forums = res.data
      }).catch(function (err) {
        console.log(err);
      })
    },
    addForum: function () {
      axios.post('http://localhost:3000/api/forum',
      {
        title: app.title,
        content: app.content,
        author: app.userid
      },{
        headers: {token: app.token}
      }
    ).then(function (res) {
      if(res.data.title == app.title){
        swal("Good job!", "Forum Posted", "success")
        app.getForum();
      }else{
        swal("Oh No!", "Something wrong", "failed")
        app.getForum()
      }
    }).catch(function (err) {
      console.log(err);
    })
  },
  getDataById: function (id) {
    axios.get('http://localhost:3000/api/forum/'+id,
    {headers: {token: app.token}}
  ).then(function (res) {
    app.update_title = res.data.title,
    app.update_content = res.data.content,
    app.update_id = res.data._id
  }).catch(function (err) {
    console.log(err);
  })
  },
  updateForum: function (id) {
    swal({
      title: "Are you sure?",
      text: "Your data will be change",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, update it!",
      closeOnConfirm: false
    },
    function(){
      axios.put('http://localhost:3000/api/forum/'+id,
      {
        title: app.update_title,
        content: app.update_content,
      },{
        headers: {token: app.token}
      }
    ).then(function (res) {
      swal("Updated!", "Your imaginary file has been deleted.", "success");
      app.getForum();
    }).catch(function (err) {
      console.log(err);
    })

  });
  },
  deleteForum:function (id) {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this forum!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    },
    function(){
      axios.delete('http://localhost:3000/api/forum/'+id,
      {headers: {token: app.token}}
    ).then(function (res) {
      app.getForum()
      swal("Deleted!", "Your imaginary file has been deleted.", "success");
    }).catch(function (err) {
      console.log(err);
    })
  });
  },
  logout:function () {
    localStorage.removeItem("userid")
    localStorage.removeItem("name")
    localStorage.removeItem("token")
    window.location.href = 'http://localhost:8080/'
  }
  }
  })

app.getForum()
