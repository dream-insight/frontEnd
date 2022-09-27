# Toast message component plugin

# 1. 사용방법
```javascript
// main.js
import pagination from '@/components/toast'
Vue.component('pagination', pagination)
```

```vue
<template>
  <div>
    <p>현제 페이지는 {{ page }} 입니다.</p>
    <div class="wrap">
      <pagination :total="total" :size="pageSize" v-model="page" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'paginationPrev',
  data() {
    return {
      total: 16723,
      pageSize: 10,
      page: 1,
    }
  },
}
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css');
.wrap {
  width: 90%;
  margin: auto;
}
</style>
```

# 2. Props
| Name | Type | Default | Require | Description |
|-------|---- |---------|---------|-------------|
| value | Number | <code>none</code> | *true* | page 번호 (v-model) |
| total | Number | <code>0</code> | false | 페이지 넘버링을 만들 전체 수량 |
| size | Number | <code>10</code> | false | 페이지당 나눌 total 수량 (total / size) |
| block | Number | <code>10</code> | false | 페이지 넘버링 수량 |

## 3. 그 외
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
import { faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight)

Vue.component('font-awesome-icon', FontAwesomeIcon)
```

:arrow_left: [컴포넌트 목록으로이동](https://github.com/dream-insight/frontEnd/tree/main/src)