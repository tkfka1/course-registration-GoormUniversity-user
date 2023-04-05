<script setup>
import axios from 'axios'
</script>

<template>
  <h1>AI 동물판독기1</h1>
  <h6>수강신청 기다리느라 지루하시죠?</h6>
  <h6>이미지를 넣으시면 동물의 종류를 판독해드립니다.</h6>

  <div class="main-container">
    <div class="room-deal-information-container">
    <button v-if="files[0]" class="room-deal-information-title btn btn-primary w-100" @click="startML()">판독 시작</button>
    <div v-else class="room-deal-information-title">사진 등록</div>
      <div class="room-picture-notice">
        <ul v-if="animalcode" class="room-write-wrapper">
          <li>
            <h3>이 동물은 : {{ animalname }} 입니다.</h3>
          </li>
          <!-- <li>{{ animalcode }}</li> -->
      </ul>
      <ul v-else class="room-write-wrapper">
          <li>
            사진은 사이즈가 작은사이즈를 권장합니다. (최대 800px)
          </li>
          <li>사진 용량은 10MB 까지 등록이 가능합니다.</li>
      </ul>
    </div>
      <div class="room-file-upload-wrapper">
        <div v-if="!files.length" class="room-file-upload-example-container">
          <div class="room-file-upload-example">
            <div class="room-file-image-example-wrapper">이미지</div>
            <!-- <div class="room-file-notice-item">
                동물사진을 등록해주세요
              </div> -->
            <div class="room-file-notice-item room-file-notice-item-red">
              동물이 아닌 사진을 선택하시면 판독이 되지 않습니다.
            </div>
            <div class="room-file-notice-item room-file-upload-button">
              <div class="image-box">
                <!-- <div class="image-profile">
                <img :src="profileImage" />
                </div>-->
                <label for="file">파일 선택</label>
                <input type="file" id="file" ref="files" accept="image/jpg,image/png,image/jpeg,image/gif"
                  @change="imageUpload" />
              </div>
            </div>
          </div>
        </div>
        <div v-else class="file-preview-content-container">
          <div class="file-preview-container">
            <div v-for="(file, index) in files" :key="index" class="file-preview-wrapper">
              <div class="file-close-button" accept="image/jpg,image/png,image/jpeg,image/gif" @click="fileDeleteButton"
                :name="file.number">
                x
              </div>
              <img :src="file.preview" />
            </div>
            <div class="file-preview-wrapper-upload">
              <div class="image-box">
                <label for="file">다른 파일 등록</label>
                <input type="file" id="file" ref="files" @change="imageUpload" />
              </div>
              <!-- <div class="file-close-button" @click="fileDeleteButton" :name="file.number">x</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>