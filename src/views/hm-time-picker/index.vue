<!--
 * @Author: ZTrainWilliams ztrain1224@163.com
 * @Date: 2024-05-15 10:18:15
 * @Description: 
-->
<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item title="hmPicker" name="hmPicker">
      <div>
        <hmPicker
          v-model="timeValue"
          format="HH:mm"
          :max-next-hour="maxNextHour"
          :disabledMinutes="disabledMinutes"
          :isDate="true"
        ></hmPicker>
      </div>
      <div>
        {{ treeValue }}
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { ref, computed } from 'vue';
import hmPicker from '@/components/time-picker/hm-picker.vue';
import dayjs from 'dayjs';

const activeName = ref(['hmPicker']);
const now = dayjs().format('YYYY-MM-DD');
const preValue = ref(`${now} 03:30`);
const timeValue = ref(`${now} 23:30`);

// 获取时间次日小时最大值
const maxNextHour = computed(() => {
  const minutes = new Date(preValue.value).getMinutes();
  const hours = new Date(preValue.value).getHours();
  if (minutes > 0) {
    return hours;
  }
  return hours >= 0 ? hours : -1;
});

// 获取时间次日最大小时后的分钟最大值
const endTimeMaxNextMinute = computed(() => {
  return new Date(preValue.value).getMinutes();
});

const makeRange = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i += 1) {
    result.push(i);
  }
  return result;
};

const disabledMinutes = (hour) => {
  if (hour === maxNextHour.value + 24) {
    return makeRange(endTimeMaxNextMinute.value, 59);
  }
};
</script>

<style scoped></style>
