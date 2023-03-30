<script setup>
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useLectureClassStore , useAlertStore , useAuthStore ,useTakeLectureStore } from '@/stores';
import { fetchWrapper } from '@/helpers';
import { ref } from 'vue';
import { number } from 'yup';

// 내 id 가져오기 user._object.user.id
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const takeLectureStore = useTakeLectureStore();

const lectureClassStore = useLectureClassStore();
const { lectureClass } = storeToRefs(lectureClassStore);
lectureClassStore.getAll();

const alertStore = useAlertStore();

console.log(user._object.user.id)
console.log(typeof(user._object.user.id))

// 내 정보 가져오기
const myid = ref(0);
const name = ref("이름");
const studentId = ref("학번");
const credit = ref(0);
const haveCredit = ref(0);
const majorId = ref(0);
const majorName = ref("");
// 검색 및 필터 초기화
const searchLectureClassName = ref("");
const searchLectureClassCredit = ref("");
const searchLectureClassWeek = ref("");
const searchLectureClassMajor = ref("");

function myinfo(){
    fetchWrapper.get(`/api/user/auth/${user._object.user.id}`).then((res) => {
    myid.value = res.id;
    name.value = res.name;
    studentId.value = res.studentId;
    credit.value = res.credit;
    haveCredit.value = res.haveCredit;
    majorId.value = res.major.id;
    majorName.value = res.major.name;
    });
}
myinfo()


async function takeLectureClass(id,lid,name,cred) {
    var data = new Object();
    var lectureClass = new Object();
    var user = new Object();
    lectureClass.id = String(id);
    user.id = lid;
    data.lectureClass = lectureClass;
    data.user = user;
    data.credit = cred;

    if(credit.value < haveCredit.value + cred){
        alertStore.error("학점이 부족합니다.");
        return;
    }

    //같은 강의 다른교수


    // 인원꽉참

    try {
        await takeLectureStore.register(data);
        alertStore.success( name + ' 수강 신청 완료');
    } catch (error) {
        if(error == "500"){
            alertStore.error("이미 수강신청된 강의입니다.");
        }else{
            alertStore.error(error);
        }
    }
    lectureClassStore.getAll();
    myinfo();
}

async function cartLectureClass(id,lid,name,cred) {
    var data = new Object();
    var lectureClass = new Object();
    var user = new Object();
    lectureClass.id = String(id);
    user.id = lid;
    data.lectureClass = lectureClass;
    data.user = user;
    data.credit = cred;

    if(credit.value < haveCredit.value + cred){
        alertStore.error("학점이 부족합니다.");
        return;
    }

    //같은 강의 다른교수


    // 인원꽉참

    try {
        await takeLectureStore.register(data);
        alertStore.success( name + ' 수강 신청 완료');
    } catch (error) {
        if(error == "500"){
            alertStore.error("이미 수강신청된 강의입니다.");
        }else{
            alertStore.error(error);
        }
    }
    lectureClassStore.getAll();
    myinfo();
}






async function delLectureClass(id) {
    await takeLectureStore.delete(id)
    myinfo();
    lectureClassStore.getAll();
    alertStore.success('수강 삭제 완료');
}

function makeweek(week){
    if(week == 1){
        return "월";
    }else if(week == 2){
        return "화";
    }else if(week == 3){
        return "수";
    }else if(week == 4){
        return "목";
    }else if(week == 5){
        return "금";
    }else if(week == 6){
        return "토";
    }else if(week == 7){
        return "일";
    }
}



function searchLectureClassBTN(){
    searchLectureClassName.value = document.getElementById("searchTakeLectureId").value;
    if (searchLectureClassName.value == ""){
        return;
    }
    lectureClassStore.getAll();
}



function changeSelectCredit(event){
    searchLectureClassCredit.value = event.target.value;
    lectureClassStore.getAll();
}

function findCredit(credit){
    if (searchLectureClassCredit.value == ""){
        return true;
    }
    if(credit == searchLectureClassCredit.value){
        return true;
    }else{
        return false;
    }
}

function changeSelectMajor(event){
    if (event.target.value == "1"){
        searchLectureClassMajor.value = majorName.value;
    }
    else if (event.target.value == "2"){
        searchLectureClassMajor.value = "교양";
    }else{
        searchLectureClassMajor.value = "";
    }
    lectureClassStore.getAll();
}

function findMajorName(majorId){
    if (searchLectureClassMajor.value == ""){
        return true;
    }
    if(majorId == searchLectureClassMajor.value){
        return true;
    }else{
        return false;
    }
}

function changeSelectWeek(event){
    searchLectureClassWeek.value = event.target.value;
    lectureClassStore.getAll();

}

function findWeek(week){
    if (searchLectureClassWeek.value == ""){
        return true;
    }
    if(week == searchLectureClassWeek.value){
        return true;
    }else{
        return false;
    }
}

function findKeyWord(name){
    if (searchLectureClassName.value == ""){
        return true;
    }
    if(name.indexOf(searchLectureClassName.value) != -1){
        return true;
    }else{
        return false;
    }
}

function makeList(){
    return user._object.user.id;
}

</script>






<template>
    <div class="form-row">
        <h3>{{ name }} ({{ majorName }})  학번 : {{ studentId }}</h3>
    </div>
    <div class="form-row">
    <h3>최대학점 : {{ credit }}  수강학점 : {{ haveCredit }}</h3>
    </div>
    
    <br>
    <div class="form-row">
        <div class="form-group col">
            <h4 style="">수강 가능 목록</h4>
        </div>
        <div class="form-group col">
            <select class="custom-select" @change="changeSelectCredit($event)" >
                <option value="" selected>학점</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
        <div class="form-group col">
            <select class="custom-select" @change="changeSelectWeek($event)" >
                <option value="" selected>전체요일</option>
                <option value="1">월</option>
                <option value="2">화</option>
                <option value="3">수</option>
                <option value="4">목</option>
                <option value="5">금</option>
                <option value="6">토</option>
                <option value="7">일</option>
            </select>
        </div>
        <div class="form-group col">
            <select class="custom-select" @change="changeSelectMajor($event)" >
                <option value="" selected>전공/교양</option>
                <option value="1">전공</option>
                <option value="2">교양</option>
            </select>
        </div>
        <div class="form-group col">
            <input type="text" class="form-control" id="searchTakeLectureId" placeholder="강의 이름 검색">
        </div>
        <div class="form-group col-md-1 ">
            
            <button type="button" class="btn btn-success" @click="searchLectureClassBTN">검색</button>
        </div>
    </div>

    <table class="table table-striped">
        <thead>
            <tr>
                <th>강의명</th>
                <th>전공</th>
                <th>담당교수</th>
                <th>학점</th>
                <th>수강인원</th>
                <th>요일/교시</th>
                <th style="width: 1%"></th>
            </tr>
        </thead>
        <tbody>
                <template v-if="lectureClass.length">
                    <tr v-for="user in lectureClass.filter((l) => findCredit(l.lecture.credit) && findWeek(l.week) && findMajorName(l.lecture.major.name) && findKeyWord(l.lecture.name) )" :key="user.id" >
                        <td>{{ user.lecture.name }}</td>
                        <td>{{ user.lecture.major.name }}</td>
                        <td>{{ user.professor.name }}</td>
                        <td>{{ user.lecture.credit }}</td>
                        <td>{{ user.classPeople }} / {{ user.classMax }}</td>
                        <td>{{ makeweek(user.week) }} / {{ user.period }}교시</td>
                        <td style="white-space: nowrap">
                            <button @click="takeLectureClass(user.id, makeList(), user.lecture.name , user.lecture.credit )" class="btn btn-sm btn-secondary mr-1" :disabled="user.isDeleting">
                                <span>강의세부</span>
                            </button>
                            <button @click="cartLectureClass(user.id, makeList(), user.lecture.name , user.lecture.credit )" class="btn btn-sm btn-info mr-1" :disabled="user.isDeleting">
                                <span>장바구니</span>
                            </button>
                            <button @click="takeLectureClass(user.id, makeList(), user.lecture.name , user.lecture.credit )" class="btn btn-sm btn-primary mr-1" :disabled="user.isDeleting">
                                <span>수강신청</span>
                            </button>
                        </td>
                    </tr>
                </template>
            <tr v-if="lectureClass.loading">
                <td colspan="4" class="text-center">
                    <span class="spinner-border spinner-border-lg align-center"></span>
                </td>
            </tr>        
        </tbody>
    </table>


</template>
