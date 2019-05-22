<template>
  <ul :class="['img-pwd', status=='disabled'?'disabled':'']" :id="rangeId">
    <li
      v-for="(i, index) in values"
      :key="i"
      :value="i"
      @mousedown="handlePc($event)"
      @mousemove="handlePc($event)"
      @mouseup="handlePc($event)"
      @touchstart="handleTouch($event)"
      @touchend="handleTouch($event)"
      @touchmove="handleTouch($event)"
    >
      <div class="li-wrapper" ref="liWrapper" :value="i" :data-num="index+1">
        <div class="dot">
          <span></span>
        </div>
        <span :class="['line', isHideLine ? 'hide-line' : '']"></span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "img-lock",
  props: {
    status: {
      type: String,
      default() {
        return "";
      }
    },
    isHideLine: {
      type: Boolean,
      default() {
        return false;
      }
    },
    values: {
      type: [String, Array],
      validator(val) {
        if (
          typeof val === "string" ||
          Object.prototype.toString.call(val) === "[object Array]"
        ) {
          if (val.length == 9) return true;
        }
        console.error("值必须为字符串或数组且长度为9");
        return false;
      },
      default() {
        return "1W.,5M9b/";
      }
    },
    value: [String, Number]
  },
  data() {
    return {
      isLock: false,
      isDown: false,
      interval: null,
      el: "",
      activeNum: 0,
      startX: 0,
      startY: 0,
      rangeId: "imgpwd" + parseInt(Math.random() * 10000000)
    };
  },
  methods: {
    handlePc(event) {
      const type = event.type;
      if (type === "mousedown") {
        this.isDown = true;
        event.changedTouches = [event];
        this.handleTouch(event);
      } else {
        if (this.isDown === false) return false;
        event.changedTouches = [event];
        if (type === "mousemove") {
          this.handleTouch(event);
        } else if (type === "mouseup") {
          this.handleTouch(event);
        }
      }
    },
    handleTouch(event) {
      event.preventDefault();
      if (this.isLock) return false;
      let touch = event.changedTouches ? event.changedTouches[0] : event;
      let { startX, startY } = this;
      let $el = null;
      switch (event.type) {
        case "touchstart":
        case "mousedown":
          $el = this.getPathLi(event.path);
          if ($el) {
            this.activeNum += 1;
            $el.classList.add("active");
            this.el = $el;
            this.startX = touch.pageX;
            this.startY = touch.pageY;
            this.getCenterPosition($el);
            this.activePwd($el);
            this.updateData($el.getAttribute("value"));
          }
          break;
        case "touchend":
        case "mouseup":
          this.el.children[1].style.height = 0;
          this.isLock = true;
          this.isDown = false;
          this.$emit("success", this.value);
          break;
        case "touchmove":
        case "mousemove":
          $el = document.elementFromPoint(touch.pageX, touch.pageY)
            ? document.elementFromPoint(touch.pageX, touch.pageY).offsetParent
            : "";
          if (!$el) return false;
          let angle = this.getAngle(touch.pageX - startX, touch.pageY - startY);
          let direction = this.getDirection(angle);
          let $line = this.el.children[1];
          let lineHeight = 0;
          switch (direction) {
            case 0:
              // console.log("未滑动！");
              break;
            case 1:
              if (angle > -90) {
                angle = Math.abs(-90 + Math.abs(angle));
              } else {
                angle += 90;
              }
              lineHeight += startY - touch.pageY;
              // console.log("向上！", angle, lineHeight)
              break;
            case 2:
              lineHeight += touch.pageY - startY;
              angle += 90;
              // console.log("向下！", angle, lineHeight)
              break;
            case 3:
              angle += 90;
              lineHeight += startX - touch.pageX;
              // console.log("向左！", angle, lineHeight)
              break;
            case 4:
              lineHeight += touch.pageX - startX;
              angle += 90;
              // console.log("向右！", angle, lineHeight)
              break;
          }
          $line.style.transform = `rotate(${angle}deg)`;
          $line.style.height = `${lineHeight}px`;
          $line.setAttribute("data-h", lineHeight);
          $line.style.top = `-${lineHeight}px`;
          if ($el.className === "li-wrapper") {
            this.activeNum += 1;
            this.getCenterPosition($el);
            this.setFinalPosition(this.el, $el);
            this.el = $el;
            this.activePwd($el);
            this.updateData($el.getAttribute("value"));
            $el.classList.add("active");
            if (this.activeNum == this.values.length) {
              this.isLock = true;
              this.$emit("success", this.value + $el.getAttribute("value"));
            }
          }
          break;
      }
    },
    getCenterPosition($el) {
      let difference = $el.clientHeight / 2;
      this.startX = $el.offsetLeft + difference;
      this.startY = $el.offsetTop + difference;
    },
    //获得角度
    getAngle(angx, angy) {
      return (Math.atan2(angy, angx) * 180) / Math.PI;
    },
    //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
    getDirection(angle) {
      let result = 0;
      if (angle >= -135 && angle <= -45) {
        result = 1;
      } else if (angle > 45 && angle < 135) {
        result = 2;
      } else if (
        (angle >= 135 && angle <= 180) ||
        (angle >= -180 && angle < -135)
      ) {
        result = 3;
      } else if (angle >= -45 && angle <= 45) {
        result = 4;
      }
      return result;
    },
    getPathLi(path = []) {
      for (let i = 0, len = path.length; i < len; i++) {
        if (path[i].id == this.rangeId) break;
        if (path[i].className == "li-wrapper") {
          return path[i];
        }
      }
      return false;
    },

    setFinalPosition($prevEl, $nextEl) {
      const half = $nextEl.clientWidth / 2,
        pX = $prevEl.offsetLeft + half,
        pY = $prevEl.offsetTop + half,
        nX = $nextEl.offsetLeft + half,
        nY = $nextEl.offsetTop + half,
        pNum = $prevEl.dataset.num,
        nNum = $nextEl.dataset.num,
        absVal = Math.abs(pNum - nNum);
      let lineH = Math.abs(pX - nX),
        angle = 0;
      switch (absVal) {
        case 1:
          if (pY > nY) {
            angle = 65.5;
            lineH = Math.abs(pX - nX) + 25;
          } else if (pX < nX) {
            angle = 90;
          } else if (pY < nY) {
            angle = 247.5;
          } else {
            angle = 270;
          }
          break;
        case 2:
          lineH += 35;
          if (pY > nY) {
            angle = 47;
          } else if ((pX > nX || pX < nX) && pY == nY) {
            angle = pX < nX ? 90 : 270;
            lineH = Math.abs(pX - nX);
          } else {
            angle = 228;
          }
          break;
        case 3:
          lineH = Math.abs(pY - nY);
          if (pY > nY) {
            angle = 0;
          } else {
            angle = 180;
          }
          break;
        case 4:
          lineH += 35;
          if (pY < nY && pX < nX) {
            angle = 135.5;
          } else if (pY < nY && pX > nX) {
            angle = 228;
            lineH = Math.abs(pY - nY) + Math.abs(pX - nX) / 2;
          } else if (pY > nY && pX < nX) {
            angle = 48;
            lineH = Math.abs(pY - nY) + Math.abs(pX - nX) / 2 - 2;
          } else {
            angle = 312;
          }
          break;
        case 5:
          lineH = Math.abs(pY - nY);
          if (pY > nY && pX < nX) {
            angle = 28.5;
            lineH += 34;
          } else if (pY < nY && pX < nX) {
            angle = 112.5;
            lineH = Math.abs(pX - nX) + 35;
          } else if (pY < nY && pX > nX) {
            angle = 208;
            lineH += 35;
          } else if (pY > nY && pX > nX) {
            angle = 294;
            lineH = Math.abs(pX - nX) + 28;
          }
          break;
        case 6:
          lineH = Math.abs(pY - nY);
          if (pY > nY) {
            angle = 0;
          } else {
            angle = 180;
          }
          break;
        case 7:
          lineH = Math.abs(pY - nY) + 35;
          if (pY < nY) {
            angle = 157.5;
          } else {
            angle = 331;
          }
          break;
        case 8:
          lineH = Math.abs(pY - nY) + Math.abs(pX - nX) / 2;
          if (pY < nY) {
            angle = 135;
          } else {
            lineH -= 2;
            angle = 312;
          }
          break;
      }
      let $line = $prevEl.children[1].style;
      $line.transform = `rotate(${angle}deg)`;
      $line.height = `${lineH}px`;
      $line.top = `-${lineH}px`;
    },
    activePwd($el) {
      $el.children[1].style.height = 0 + "px";
      $el.children[1].style.top = -0 + "px";
    },
    updateData(val) {
      let newval = this.value + val;
      this.$emit("input", newval);
      this.$emit("change", val, newval);
    },
    reset() {
      this.activeNum = 0;
      this.isLock = false;
      this.isDown = false;
      this.$emit("input", '');
      this.$refs.liWrapper.forEach(el => {
        el.children[1].style = '';
        el.children[1].removeAttribute('data-h');
        el.classList.remove("active");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$activeColor: #3adad3;
$disabledColor: #f54228;
ul {
  list-style: none;
  padding-left: 0;
  display: table;
  width: 300px;
  &.disabled {
    li .li-wrapper {
      &.active {
        border-color: $disabledColor;
        .dot span,
        .line {
          background: $disabledColor;
          opacity: 1;
        }
      }
    }
  }
}
li {
  width: 33.33%;
  float: left;
  text-align: center;
  margin-bottom: 20px;
  user-select: none;
  $val: 70px;
  &:nth-last-child(-n + 3) {
    margin-bottom: 0;
  }
  &:nth-last-child(3n + 1) {
    margin-right: 0;
  }
  .li-wrapper {
    width: $val;
    height: $val;
    border: 2px solid #ccc;
    box-sizing: border-box;
    text-align: center;
    border-radius: 50%;
    line-height: $val;
    position: relative;
    z-index: 1;
    transition: border-color 0.4s;
    background: #fff;
    margin: 0 auto;
    &.active {
      border-color: $activeColor;
      .dot span,
      .line:not(.hide-line) {
        opacity: 1;
      }
    }
    .line {
      display: block;
      width: 10px;
      height: 0;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      opacity: 0;
      margin: auto;
      background: $activeColor;
      position: absolute;
      transform: rotate(0deg);
      // z-index: 99;
      transform-origin: bottom center;
    }
    .dot {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      position: absolute;
      z-index: 99;
      left: 0;
      top: 0;
      background: #fff;
      span {
        display: block;
        opacity: 0;
        transition: opacity 0.4s;
        width: 30%;
        height: 30%;
        margin: auto;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        background: $activeColor;
      }
    }
  }
}
</style>
