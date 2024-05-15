<template>
  <el-tooltip
    ref="refPopper"
    :visible="show"
    effect="light"
    pure
    trigger="click"
    role="dialog"
    teleported
    popper-class="time-picker-box"
    :fallback-placements="['bottom', 'top', 'right', 'left']"
    :gpu-acceleration="false"
    :stop-popper-mouse-event="false"
    :virtual-triggering="false"
    :hide-after="0"
    persistent
    @show="onShow"
    @hide="onHide"
  >
    <template #default>
      <el-input
        ref="timeInput"
        :style="{ ...style }"
        @focus="focus"
        :disabled="disabled"
        :model-value="currentValue"
        :placeholder="placeholder"
        @click.stop
      >
        <template #prefix>
          <el-icon><Clock /></el-icon>
        </template>
      </el-input>
    </template>
    <template #content>
      <div class="menu-box" ref="menuBoxRef">
        <div class="menu-main" @mouseenter="handleMouse('Enter')" @mouseleave="handleMouse('Leave')">
          <div class="menu-main-box">
            <ul
              class="leftTime container"
              ref="leftTime"
              @mouseenter="handleMouse('Enter')"
              @mouseleave="handleMouse('Leave')"
            >
              <li class="timeItem" :style="{ height: defualtHeight + 'px' }"></li>
              <li
                @click="changeTime('h', item, index)"
                :ref="'timeItem' + index"
                v-for="(item, index) in hourList"
                :key="index + '01'"
                :class="{ activeTime: index === selectHourIndex }"
              >
                {{ item.value }}
              </li>
              <li class="timeItem" :style="{ height: defualtHeight + 'px' }"></li>
            </ul>
            <ul
              class="rightTime container"
              ref="rightTime"
              @mouseenter="handleMouse('Enter')"
              @mouseleave="handleMouse('Leave')"
            >
              <li class="timeItem" :style="{ height: defualtHeight + 'px' }"></li>
              <li
                @click="changeTime('m', item, index)"
                v-for="(item, index) in minuteList"
                :key="index + '02'"
                :class="{ activeTime: index === selectMinuteIndex, disbaled: item.disabled }"
              >
                {{ item.value }}
              </li>
              <li class="timeItem" :style="{ height: defualtHeight + 'px' }"></li>
            </ul>
          </div>
          <div class="botBut">
            <el-button class="elbutton" link type="info" @click="selectTime('close')"> 取消 </el-button>
            <el-button class="elbutton" link type="primary" @click="selectTime('yes')"> 确定 </el-button>
          </div>
          <div class="line" :style="{ top: `calc(50% - ${clientHeight - 2}px)` }"></div>
          <div class="line" :style="{ top: `calc(50% + ${2}px)` }"></div>
        </div>
      </div>
    </template>
  </el-tooltip>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch, unref } from 'vue';
import { uniqueId } from 'lodash-es';
import { onClickOutside } from '@vueuse/core';
import { Clock } from '@element-plus/icons-vue';
import dayjs from 'dayjs';

const FORMAT_TEMPLATE_DATE = 'YYYY-MM-DD';
const FORMAT_TEMPLATE_MINUTE_POINT = 'HH:mm';

const makeList = (total, method) => {
  const arr = [];
  const disabledArr = method?.();
  for (let i = 0; i < total; i += 1) {
    arr.push({ value: `${i > 9 ? i : `0${i}`}`, disabled: disabledArr?.includes(i) ?? false });
  }
  return arr;
};

const emit = defineEmits(['update:modelValue', 'update:isNextDay', 'change', 'blur']);

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  isNextDay: {
    type: Number,
    defualt: 0, // 0:当前日期，1：次日
  },
  nextText: {
    type: String,
    default: '次日',
  },
  maxNextHour: {
    type: Number,
  },
  id: {
    type: String,
    default: uniqueId('time-picker-'),
  },
  placeholder: {
    type: String,
    default: '请选择时间',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isDate: {
    // 默认YYYY-MM-DD HH:mm
    type: Boolean,
    default: false,
  },
  style: { type: Object },
  disabledMinutes: { type: Function },
});

const defualtHeight = 80;
const baseHourList = makeList(24);
const minuteList = computed(() => {
  const hourIndex = selectHourIndex.value;
  const disabledMinutes = props.disabledMinutes;
  return makeList(60, disabledMinutes && (() => disabledMinutes?.(hourIndex)));
});
const currentValue = ref('');
const curNextDay = ref(props.isNextDay);
const show = ref(false);
const clientHeight = 32;
const selectHourIndex = ref(0);
const selectMinuteIndex = ref(0);
const setTimeing = ref(false);

const timeInput = ref();
const menuBoxRef = ref();
const leftTime = ref();
const rightTime = ref();

const maxNextHourList = computed(() => {
  const result = [];
  if (props.maxNextHour !== undefined && props.maxNextHour !== -1) {
    for (let i = 0; i <= props.maxNextHour; i += 1) {
      result.push({ value: `${props.nextText}${i > 9 ? i : `0${i}`}` });
    }
  }
  return result;
});

const hourList = computed(() => {
  return [...baseHourList, ...maxNextHourList.value];
});

const focus = () => {
  if (!setTimeing.value) {
    show.value = true;
    emit('focus');
  }
};

const onShow = () => {
  emit('visible-change', true);
};
const onHide = () => {
  show.value = false;
  emit('visible-change', false);
};

const changeTime = (type, item, index) => {
  if (item.disabled) return;
  if (type === 'h') {
    leftTime.value.scrollTop = Math.max(index * 1, 0) * clientHeight;
  } else {
    rightTime.value.scrollTop = index * clientHeight;
  }
};

const handleMouse = (type) => {
  // 鼠标移入移出矫正时间对齐
  const scrollTop = leftTime.value.scrollTop;
  const selectIndex = Math.round(scrollTop / clientHeight);
  leftTime.value.scrollTop = selectIndex * clientHeight;

  const rightTimeScrollTop = rightTime.value.scrollTop;
  const rightTimeSelectIndex = Math.round(rightTimeScrollTop / clientHeight);
  rightTime.value.scrollTop = rightTimeSelectIndex * clientHeight;
};

const setClickOutside = () => {
  onClickOutside(timeInput.value, (e) => {
    const unrefedPopperEl = unref(menuBoxRef.value);
    const inputEl = unref(timeInput.value);
    if (
      (unrefedPopperEl && (e.target === unrefedPopperEl || e.composedPath().includes(unrefedPopperEl))) ||
      e.target === inputEl ||
      e.composedPath().includes(inputEl)
    ) {
      return;
    }
    if (show.value) {
      initValue();
      show.value = false;
    }
  });
};

const selectTime = (type) => {
  // 限制监听关闭窗口时自动赋值
  if (setTimeing.value) return;
  setTimeing.value = true;
  setTimeout(() => {
    setTimeing.value = false;
  }, 100);
  // console.log('selectTime', type);
  if (type === 'yes') {
    const { nextType, time } = splitChineseAndNumbers(currentValue.value);
    curNextDay.value = Number(Boolean(nextType));
    emit('update:modelValue', time);
    emit('update:isNextDay', unref(curNextDay.value));
    emit('change', time, unref(curNextDay.value)); // 选中值，是否次日时间
    emit('blur', time);
  } else {
    initValue();
  }
  nextTick(() => {
    show.value = false;
    timeInput.value && timeInput.value.blur();
  });
};

const splitChineseAndNumbers = (s) => {
  const str = unref(s);
  // 正则表达式匹配中文字符
  const chineseRegex = /[\u4e00-\u9fa5]+/g;
  // 正则表达式匹配数字与冒号（这里假设数字与冒号总是相邻的）
  const numbersWithColonsRegex = /[0-9:]+/g;

  // 初始化结果对象
  const result = {
    nextType: '', // 存储匹配到的中文字符
    time: '', // 存储匹配到的数字与冒号
  };

  // 执行匹配，并收集结果
  let match;
  // 匹配中文字符
  while ((match = chineseRegex.exec(str)) !== null) {
    result.nextType += match[0];
  }
  // 匹配数字与冒号
  while ((match = numbersWithColonsRegex.exec(str)) !== null) {
    result.time += match[0];
  }
  // 是否处理时间格式
  if (props.isDate) {
    const now = dayjs();
    const currentDate = now.format(FORMAT_TEMPLATE_DATE);
    const nextDate = now.add(1, 'day').format(FORMAT_TEMPLATE_DATE);
    const setDate = result.nextType ? nextDate : currentDate;

    result.time = `${setDate} ${result.time}`;
  }
  // 返回结果对象
  return result;
};

// 恢复原值
const initValue = () => {
  const modelValue = props.modelValue;
  let isNextDay = props.isNextDay;
  if (!modelValue) {
    currentValue.value = '';
    curNextDay.value = 0;
    return;
  }
  let [leftDistance = '00', rightDistance = '00'] = modelValue.split(':');
  if (props.isDate) {
    const now = dayjs();
    const current = dayjs(modelValue);
    isNextDay = Number(!current.isSame(now, 'day')); // 判断是否同一天
    // 修正isNextDay
    curNextDay.value = isNextDay;
    emit('update:isNextDay', curNextDay.value);
    currentValue.value = `${isNextDay ? props.nextText : ''}${current.format(FORMAT_TEMPLATE_MINUTE_POINT)}`;
    [leftDistance = '00', rightDistance = '00'] = modelValue.split(' ')[1].split(':');
  } else {
    currentValue.value = `${isNextDay ? props.nextText : ''}${modelValue}`;
  }

  if (isNextDay) {
    leftDistance = `${props.nextText}${leftDistance}`;
  }
  const leftDistanceIndex = hourList.value.findIndex((v) => v.value === leftDistance);
  const rightDistanceIndex = minuteList.value.findIndex((v) => v.value === rightDistance);
  if (leftDistanceIndex === -1) {
    console.log(new Error("don't find the value of afterHour, please set maxNextHour"));
    return;
    // leftDistanceIndex = 23;
  }
  selectHourIndex.value = leftDistanceIndex;
  selectMinuteIndex.value = rightDistanceIndex;
};

const setCurrentValue = () => {
  curNextDay.value = Number(selectHourIndex.value > baseHourList.length - 1);
  const minuteValue = minuteList.value[selectMinuteIndex.value];
  if (minuteValue.disabled) {
    const item = [...minuteList.value].reverse().find((v) => !v.disabled);
    let setIndex = 0;
    if (item) {
      setIndex = item.value;
    }
    if (setIndex !== selectMinuteIndex.value) {
      selectMinuteIndex.value = setIndex;
      rightTime.value.scrollTop = selectMinuteIndex.value * clientHeight + 1;
    }
  }
  currentValue.value = `${hourList.value[selectHourIndex.value].value}:${
    minuteList.value[selectMinuteIndex.value].value
  }`;
};

watch(
  () => props.modelValue,
  (newVal) => {
    initValue();
  },
  {
    deep: true,
    immediate: true,
  }
);

watch(
  () => show.value,
  (newVal) => {
    if (!props.disabled && newVal) {
      nextTick(() => {
        leftTime.value.scrollTop = Math.max(selectHourIndex.value * 1, 0) * clientHeight + 1;
        rightTime.value.scrollTop = selectMinuteIndex.value * clientHeight + 1;
        setTimeout(() => {
          // 延迟再次改变scrollTop调用addEventListener('scroll')赋值
          leftTime.value.scrollTop = leftTime.value.scrollTop - 1;
          rightTime.value.scrollTop = rightTime.value.scrollTop - 1;
        }, 10);
      });
    } else {
      document.removeEventListener('scroll', () => {});
      document.removeEventListener('click', () => {});
    }
  }
);

onMounted(() => {
  nextTick(() => {
    setClickOutside();

    leftTime.value.addEventListener('scroll', (event) => {
      event.preventDefault();
      const scrollTop = leftTime.value.scrollTop;
      if (!props.modelValue && !currentValue.value && scrollTop < 2) return;
      selectHourIndex.value = Math.round(scrollTop / clientHeight); // 加粗选中数字
      setCurrentValue();
    });
    rightTime.value.addEventListener('scroll', (event) => {
      event.preventDefault();
      const scrollTop = rightTime.value.scrollTop;
      if (!props.modelValue && !currentValue.value && scrollTop < 2) return;
      selectMinuteIndex.value = Math.round(scrollTop / clientHeight); // 加粗选中数字
      setCurrentValue();
    });
  });
});

onBeforeUnmount(() => {
  document.removeEventListener('scroll', () => {});
  document.removeEventListener('click', () => {});
});
</script>
<style lang="scss" scoped>
.time-picker-box {
  .menu-box {
    width: 182px;
    height: 230px;
    padding-top: 10px;
    .menu-main {
      background-color: #fff;
      width: 100%;
      border-radius: 4px;
      z-index: 9;
      .menu-main-box {
        display: flex;
        height: 192px;
        user-select: none;
      }

      .container {
        padding: 0;
        width: 50%;
        overflow: scroll;
        overflow-x: hidden;
        text-align: center;
        font-size: 12px;
        color: #606266;
        cursor: pointer;
        list-style: none;
        margin: 0;
        box-sizing: border-box;

        li {
          height: 32px;
          line-height: 32px;
          list-style: none;
        }

        :hover {
          background-color: #4d7fff16;
        }

        .timeItem:hover {
          background-color: transparent;
        }

        .activeTime {
          font-weight: bold;
          color: #000;

          &:hover {
            background-color: transparent;
          }
        }
        .disbaled {
          cursor: not-allowed;
        }
      }

      .botBut {
        width: 99%;
        height: 36px;
        border-top: 1px solid #d7d7d7;
        position: absolute;
        bottom: 2px;
        background-color: #fff;
        display: flex;
        justify-content: flex-end;
        padding: 4px 10px;
        box-sizing: border-box;

        .elbutton {
          font-size: 12px;
          font-weight: 500;
        }
      }

      .line {
        position: absolute;
        height: 1px;
        width: calc((100% - 40px));
        left: 20px;
        background-color: #e1e1e1;
      }
    }
  }

  .activemenuBox {
    transform: scaleY(1);
  }
}

.container::-webkit-scrollbar {
  width: 7px;
}

.container::-webkit-scrollbar-thumb {
  background-color: #dfdfdf;
  border-radius: 5px;
}

.container::-webkit-scrollbar-track {
  background-color: #fafafa;
}

.container::-webkit-scrollbar-button {
  background-color: #fff;
  border-radius: 5px;
}

.container::-webkit-scrollbar-button:hover {
  background-color: #c1c1c1;
}
</style>
