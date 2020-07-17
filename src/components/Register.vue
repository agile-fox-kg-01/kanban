<template>

    <div>
        <!-- Register -->
        <div class="login" id="register">
            
            <div class="kanan" style=" height:300px ; width:500px; display: flex; flex-direction: column; align-items: center; padding-top: 40px; padding-left:20px; padding-right:20px ;background-image: url('/img/1.jpg'); background-size: cover;">
                <h3 class="judul-form">Lets Join Us</h3>
                <p class="paragraf">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita omnis et quo esse culpa aliquid? Provident voluptatum fugit optio mollitia ut, ipsam officiis soluta repellendus quas deleniti molestiae iure. Adipisci.</p>
                <br>
                <p class="paragraf">Anda Sudah Punya Akun ?</p>
                <button @click.prevent="login" class="button-form" style="margin-top: 20px;">Login</button>
            </div>
            <div class="kiri" style="display: flex; flex-direction: column; justify-content: center; align-items: center; height:350px ; width: 400px; background-color: rgb(240, 240, 240); border-radius:10px;">


                <h3 class="judul-form">Register Member</h3>
                <form class="text-center" @submit.prevent="register">
                    <div class="form-group" >
                      <input v-model="email" type="email" class="input-form" id="email-register"  placeholder="Email Address" autocomplete="off">
                    </div>
                    <div class="form-group">
                      
                      <input v-model="password" type="password" class="input-form" id="password-register" placeholder="Password">
                    </div>

                    <div class="form-group">
                      
                      <input type="text" class="input-form" id="organization-register" placeholder="Only Hactiv8 Family" readonly>
                    </div>

                    

                    <button type="submit" class="button-form">Register</button>
                  </form>
            </div>
        </div>
    </div>
  
</template>

<script>
import axios from 'axios';

export default {
  name: "register",
  data(){
    return{
      email:'',
      password:''
    }
  },
  methods: {
    register(){
      axios({
        method: 'POST',
        url: 'http://localhost:3000/users/register',
        headers: {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImljaGxhc3VsMDg5OUBnbWFpbC5jb20iLCJpYXQiOjE1OTQ4MjU5MTR9.PkVOFnE5RYMZIgsaRWBsm88ir7rtXjQpuRuVCXKPz6g'
        },
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({data}) =>{
          this.$emit('isLogin');
        })
        .catch(console.log)
    }
      
  }

  

}
</script>

<style>

</style>