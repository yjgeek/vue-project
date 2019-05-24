export default class NewbieGuide {
  constructor (options) {
    const { steps, currentStep = 0, finishCallback  } = options;
    this.steps = steps;
    this.currentStep = currentStep;
    this.finishCallback = finishCallback;
    this.scrollBarWidth = this.getScrollbarWidth();
    // 是否有滚动条的值
    this.widthDifference = 0;
    this.heightDifference = 0;
    if (document.body.scrollWidth > window.innerWidth) {
      this.widthDifference = this.scrollBarWidth
    }
    if (document.body.scrollHeight > window.innerWidth) {
      this.heightDifference = this.scrollBarWidth
    }
  }
  start () {
    const maskDiv = document.createElement('div');
    maskDiv.style.cssText =`background: rgba(0,0,0,.5); position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 999999;`
    this.container = maskDiv;
    document.body.appendChild(maskDiv); 
    this.handleStep();
    const data = this.steps[this.currentStep];
    if (data) {
      this.playStep(data)
    }
  }
  // 播放
  playStep(config) {
    this.container.innerHTML = '';
    const css = getComputedStyle(config.$el);
    if (css.position && css.position !== 'inherit') {
      config.$el.style.zIndex = 9999999;
    }
    this.container.appendChild(config.renderHtml)
  }
  // 处理步骤
  handleStep () {
    this.steps = this.steps.map((item, i) => {
      if (typeof item.position === 'string') {
        const obj = this.getIdPosition(item.position, item.placement);
        if (obj) {
          item.position = obj.position;
          item.style = obj.style;
          item.positionStyle = obj.positionStyle;
          item.$el = obj.$el;
        }
      }
      if (i === this.steps.length - 1) {
        item.renderHtml = this.createStepWrapper(item, true);
      } else {
        item.renderHtml = this.createStepWrapper(item);
      }
      return item;
    });
  }
  // 创建步骤的外壳样式
  createStepWrapper (config = {}, isLast) {
    const { title = '步骤', description = '...', positionStyle } = config;
    const maskDiv = document.createElement('div');
    maskDiv.classList.add('step-item');
    maskDiv.style.cssText = `background: #fff; border-radius: 5px; position: fixed; transition: all .4s; ${positionStyle}`;
    maskDiv.innerHTML = `
      <div class="step-title" style="height: 30px; line-height: 30px; padding-left: 10px; border-bottom: 1px solid #eee">${title}</div>
      <div class="step-content" style="padding: 10px; font-size: 14px;">${description}</div>
      <div class="step-footer" style="height: 30px; line-height: 30px; border-top: 1px solid #eee"></div>
    `
    const prevBtn = document.createElement('button');
    prevBtn.innerText = '上一步';
    maskDiv.lastElementChild.appendChild(prevBtn)
    prevBtn.addEventListener('click', (event) => {
      this.currentStep -= 1;
      config.$el.style.zIndex = '';
      this.playStep(this.steps[this.currentStep])
    })
    if (!isLast) {
      const nextBtn = document.createElement('button');
      nextBtn.innerText = '下一步';
      maskDiv.lastElementChild.appendChild(nextBtn)
      nextBtn.addEventListener('click', (event) => {
        this.currentStep += 1;
        config.$el.style.zIndex = '';
        this.playStep(this.steps[this.currentStep])
      })
    } else {
      const finishBtn = document.createElement('button');
      finishBtn.innerText = '完成';
      maskDiv.lastElementChild.appendChild(finishBtn)
      finishBtn.addEventListener('click', (event) => {
        this.container.remove();
        this.finishCallback && this.finishCallback(); 
      })
    }
    return maskDiv;
  }
  // 获取id的坐标
  getIdPosition(id, placement = 'lt') {
    // lt tc rt rc rb bc lb lc
    const $el = document.getElementById(id);
    if (!$el) return false;
    let { x, y, width, height } = $el.getBoundingClientRect()
    let style = '';
    const w = window.innerWidth - this.widthDifference; 
    const h = window.innerHeight - this.heightDifference;
    if (placement === 'lt') {
      x = w - x;
      y = h - y;
      style = `right: ${x}px; bottom: ${y}px;`;
    } else if (placement === 'tc') {
      x += width / 2;
      y = h - y;
      style = `left: ${x}px; bottom: ${y}px;`;
    } else if (placement === 'rt') {
      x += width;
      y = h - y;
      style = `left: ${x}px; bottom: ${y}px;`;
    } else if (placement === 'rc') {
      x += width;
      y += height / 2;
      style = `left: ${x}px; top: ${y}px;`;
    } else if (placement === 'rb') {
      x += width;
      y += height;
      style = `left: ${x}px; top: ${y}px;`;
    } else if (placement === 'bc') {
      x += width / 2;
      y += height;
      style = `left: ${x}px; top: ${y}px;`;
    } else if (placement === 'lb') {
      x = w - x;
      y += height;
      style = `right: ${x}px; top: ${y}px;`;
    } else if (placement === 'lc') {
      x = w - x;
      y += height / 2;
      style = `right: ${x}px; top: ${y}px;`;
    }
    return { position: [x, y], $el, positionStyle: style};
  }
  getScrollbarWidth() {
    var odiv = document.createElement('div'),//创建一个div
      styles = {
        width: '100px',
        height: '100px',
        overflowY: 'scroll'//让他有滚动条
      }, i, scrollbarWidth;
    for (i in styles) odiv.style[i] = styles[i];
    document.body.appendChild(odiv);//把div添加到body中
    scrollbarWidth = odiv.offsetWidth - odiv.clientWidth;//相减
    odiv.remove();//移除创建的div
    return scrollbarWidth;//返回滚动条宽度
  }
}
