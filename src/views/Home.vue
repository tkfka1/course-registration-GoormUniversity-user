<script setup>
import { storeToRefs } from 'pinia';
import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/stores';
import { ref } from 'vue';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const name = ref("이름");
const studentId = ref("학번");

fetchWrapper.get(`/api/user/auth/${user._object.user.id}`).then((res) => {
    name.value = res.name;
    studentId.value = res.studentId;

});

</script>

<template>
    <div v-if="user">
        <h1>안녕하세요 {{ name }}!</h1>
        <p>구름대학 수강신청에 오신것을 환영합니다.</p>
        <p><router-link to="/users">수강신청목록</router-link></p>
        <p><router-link to="/users">강의목록</router-link></p>
        <p><router-link to="/users">내정보</router-link></p>
    </div>

    


</template>
