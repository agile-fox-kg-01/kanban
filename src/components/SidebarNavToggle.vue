<template>
<div class="sidebarnav">
    <nav id="sidebartogle">
        <ul class="list-unstyled components">
            <li>
                <a v-on:click="myTaskBtn()">My Task</a>
                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">Groups</a>
                <ul class="collapse list-unstyled" id="pageSubmenu">
                    <li><a v-on:click="newGroup()">new group</a></li>
                </ul>
                <ul class="collapse list-unstyled" id="pageSubmenu" v-for="group in groups" :key="group.id">
                    <li><a v-on:click="groupBtn(group.id)">{{group.name}}</a></li>
                </ul>
            </li>
        </ul>
        <div class="sidebar-footer">
            <a>
                <i class="fa fa-envelope"></i> message
            </a>
            <a v-on:click="logoutBtn">
                <i class="fa fa-power-off"></i> logout
            </a>
        </div>
    </nav>
</div>
</template>

<script>
import axios from '../api/axios'

export default {
    name: 'Dashboard',
    props: {
        groups: Array
    },
    methods: {
        groupBtn(id) {
            this.$emit('toContentGroupTask',id)
        },
        newGroup() {
            this.$emit('toNewGroup')
        },
        myTaskBtn() {
            this.$emit('toContentMyTask')
        },
        logoutBtn() {
            localStorage.removeItem('token')
            this.$gAuth.signOut()
            .then(res => {
                this.$emit('toLoginForm')
            }).catch(err => {
                this.$emit('toError')
            })
        }
    },
    created() {
        if (!localStorage.getItem("token")) {
            this.$emit('toLoginForm')
        }
    }
}
</script>

<style>
</style>
