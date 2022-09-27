# Toast message component plugin

# 1. 사용방법
```javascript
// main.js
import toast from '@/components/toast'

// opational config
const options = {
  maxShowMessage: 3,
  delay: 5
}

Vue.use(toast, options)
```

```vue
<template>
  <div>
    <p><button type="button" @click="showToast('success')">success toast</button></p>
    <p><button type="button" @click="showToast('info')">info toast</button></p>
    <p><button type="button" @click="showToast('warning')">warning toast</button></p>
    <p><button type="button" @click="showToast('error')">error toast</button></p>
  </div>
</template>

<script>
export default {
  name: 'toast',
  methods: {
    showToast(color) {
      if (color == 'success') {
        this.$toast('success toast message')
      } else {
        this.$toast({ color, message: `${color} toast message` })
      }
    }
  }
}
</script>
```

# 2. options
```javascript
{
  maxShowMessage: 3,
  delay: 5
}
```

| Name | Type | Default | Require | Description |
|-------|---- |---------|---------|-------------|
| maxShowMessage | Number | <code>3</code> | false | 화면에 표시될 최대 메시지 수량 |
| dalay | Number | <code>5</code> | false | 메시지가 화면에 표시되는 시간 (초 단위) |

# 3. API method

## <code>$toast(options)</code>
* 토스트 메시지를 표시 합니다.
```javascript
this.$toast('토스트 메시지')
// or
this.$toast({
  message: '토스트 메시지',
  color: 'success'
})
```
### method options

| Name | Type | Default | Require | Description |
|-------|---- |---------|---------|-------------|
| message | String | <code>''</code> | *true* | 메시지 내용 |
| color | String | <code>success, info, warnig, error</code> | false | 토스트 박스의 배경 색상과, 아이콘 모양을 결정합니다. |

## 4. 그 외
### Fontawsome 과 함께 사용하여야 icon 표시 가능

```
npm install @fortawesome/fontawesome-svg-core
npm install @fortawesome/free-solid-svg-icons
npm install @fortawesome/vue-fontawesome
```

```javascript
// main.js
// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faExclamationTriangle, faInfoCircle, faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle, faInfoCircle, faExclamationTriangle, faBan)

Vue.component('font-awesome-icon', FontAwesomeIcon)
```

:arrow_left: [컴포넌트 목록으로이동](https://github.com/dream-insight/frontEnd/tree/main/src)