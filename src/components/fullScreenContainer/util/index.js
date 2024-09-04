/*
 * @Author: 车南 chenan_yushun@163.com
 * @Date: 2023-02-15 11:44:40
 * @Description:
 */
import { cloneDeep } from 'lodash-es';

export function randomExtend(minNum, maxNum) {
  if (arguments.length === 1) {
    return parseInt(Math.random() * minNum + 1, 10);
  } else {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
  }
}

export function debounce(delay, callback) {
  let lastTime;

  return function () {
    clearTimeout(lastTime);

    const [that, args] = [this, arguments];

    lastTime = setTimeout(() => {
      callback.apply(that, args);
    }, delay);
  };
}

export function observerDomResize(dom, callback) {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

  const observer = new MutationObserver(callback);

  observer.observe(dom, { attributes: true, attributeFilter: ['style'], attributeOldValue: true });

  return observer;
}

export function getPointDistance(pointOne, pointTwo) {
  const minusX = Math.abs(pointOne[0] - pointTwo[0]);

  const minusY = Math.abs(pointOne[1] - pointTwo[1]);

  return Math.sqrt(minusX * minusX + minusY * minusY);
}

export function uuid(hasHyphen) {
  return (hasHyphen ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx').replace(
    /[xy]/g,
    function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );
}

export function deepMerge(target, merged) {
  for (const key in merged) {
    if (Object.prototype.hasOwnProperty.call(merged, key)) {
      if (target[key] && typeof target[key] === 'object') {
        deepMerge(target[key], merged[key]);
        continue;
      }

      if (typeof merged[key] === 'object') {
        target[key] = (0, cloneDeep)(merged[key], true);
        continue;
      }

      target[key] = merged[key];
    }
  }

  return target;
}
