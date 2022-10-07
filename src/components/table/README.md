# Tooltip component

# 1. 사용방법
```javascript
// main.js
import ListTable from '@/components/table'

Vue.component('ListTable', ListTable)
```

```vue
<template>
  <div>
    <list-table :header="header" :items="items">
      <template v-slot:items="{ props }">
        <tr>
          <td class="center">{{ props.no }}</td>
          <td>{{ props.title }}</td>
          <td class="right">{{ props.number }}</td>
        </tr>
      </template>
    </list-table>
  </div>
</template>

<script>
export default {
  name: 'listTablePrev',
  data() {
    return {
      header: [
        { text: '번호', width: '100' },
        { text: '제목', width: '' },
        { text: '수치', width: '' },
      ],
      items: [],
    }
  },
  created() {
    for (let i = 0; i < 20; i++) {
      this.items.push({
        no: i + 1,
        title: `테이블 목록 - ${i + 1}`,
        number: Math.floor(Math.random() * 10000000)
      })
    }
  }
}
</script>

<style lang="scss">
table {
  width: 100%;
  border: 1px solid #444444;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #444444;
    padding: 10px;
  }

  .right {
    text-align: right
  }
  .center {
    text-align: center;
  }
}
</style>
```

# 2. Prop
| Name | Type | Default | Require | Description |
|-------|---- |---------|---------|-------------|
| message | String, Array | <code>''</code> | *true* | 툴팁 메시지, 배열입력시 리스트 형태로 출력 |
| left | Boolean | <code>false</code> | false | 메시지를 왼쪽에 표시 |
| right | Boolean | <code>false</code> | false | 메시지를 오른쪽에 표시 |
| top | Boolean | <code>false</code> | false | 메시지를 위쪽에 표시 |
| bottom | Boolean | <code>true</code> | false | 메시지를 아랫쪽에 표시 |
| width | Number | <code>300</code> | false | 메시지를 box의 최대 넓이(고정) |


:arrow_left: [컴포넌트 목록으로이동](https://github.com/dream-insight/frontEnd/tree/main/src)