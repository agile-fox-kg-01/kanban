<template>
    <div class="container register-page">
        <div class="row align-items-center justify-content-between">
            <div class="col-6 card my-5">
                <div class="card-body">
                    <form @submit.prevent="registerForm">
                        <h1>Create your Account</h1>
                        <div class="form-group">
                            <label for="register-email">Username</label>
                            <input type="text" class="form-control" id="register-username" v-model="username" placeholder="Username">
                        </div>
                        <div class="form-group">
                            <label for="register-email">Email address</label>
                            <input type="email" class="form-control" id="register-email" v-model="email" placeholder="email address">
                        </div>
                        <div class="row">
                            <div class="col-6 form-group">
                                <label for="register-email">Password</label>
                                <input type="password" class="form-control" id="register-password" v-model="password" placeholder="password">
                                <small id="errorMessage" class="form-text text-muted collapse">{{errorMsg}}</small>
                            </div>
                            <div class="col-6 form-group">
                                <label for="register-email">Confirm</label>
                                <input type="password" class="form-control" id="register-password" v-model="confirmPassword" placeholder="">
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <a v-on:click="loginBtn"><span class="btn btn-danger mx-2">Sign in instead</span></a>
                    </form>
                </div>
            </div>
            <div class="col-6">
                <div class="feature-ele text-center">
                    <img src="img/scrum.svg" alt="">
                    <h2>Manage Group Project</h2>
                    <p>Create Group and invite your partner to join . . . . .</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../api/axios'

export default {
    name: 'RegisterPage',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            confirmMessage: '',
            errorMsg: ''
        }
    },
    methods: {
        registerForm() {
            if (this.password === this.confirmPassword) {
                axios({
                    method: 'post',
                    url: '/register',
                    data: {
                        username: this.username,
                        email: this.email,
                        password: this.password
                    }
                })
                .then(res => {
                    localStorage.setItem('token', res.data.token)
                    this.$emit('toDashboard')
                })
                .catch(err => {
                    if (err.response) {
                        $('#errorMessage').show()
                        this.errorMsg = err.response.data.error
                    } else {
                        this.$emit("toError");
                    }
                })
            } else {
                $('#errorMessage').show()
                this.errorMsg = 'password not match'
            }
        },
        loginBtn() {
            this.$emit('toLoginForm')
        }
    }
}
</script>

<style>

</style>