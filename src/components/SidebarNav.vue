<template>
<div class="sidebarnav">
    <nav id="sidebar">
        <div class="sidebar-header">
            <h3>kanbanApp</h3>
        </div>
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
/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */
#sidebar {
    width: 14%;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 999;
    background: rgba(0, 0, 0, 0.774);
    color: #fff;
    transition: all 0.3s;
}

#sidebar .sidebar-header {
    padding: 9px;
    background: rgba(0, 0, 0, 0.774);
    color: #fff;
}

#sidebar ul.components {
    padding: 0 0;
}

#sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
}
#sidebar ul li a:hover {
    color: #7386D5;
    background: #fff;
}

ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
}

.sidebar-footer {
  position: absolute;
  width: 100%;
  bottom: 20px;
  display: flex;
}

.sidebar-footer > a {
  flex-grow: 1;
  text-align: center;
  height: 30px;
  line-height: 30px;
  position: relative;
}
</style>