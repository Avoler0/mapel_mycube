<script lang="ts">
  import { apiKey } from "$lib/stores/apiKeyStore";
  import { cube_ready } from "$lib/stores/cubeStore";

	let key = '';
  const nameApiKey = {
		dlgustn: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJYLUFwcC1SYXRlLUxpbWl0IjoiNTAwOjEwIiwiYWNjb3VudF9pZCI6IjIwMTk0NTk4OSIsImF1dGhfaWQiOiIyIiwiZXhwIjoxNzA4Njg3MDc0LCJpYXQiOjE2OTMxMzUwNzQsIm5iZiI6MTY5MzEzNTA3NCwic2VydmljZV9pZCI6IjQzMDAxMTM5NyIsInRva2VuX3R5cGUiOiJBY2Nlc3NUb2tlbiJ9.KD4zOLZhkgAtSiq90upefiqy2clxTfFFSLtj9dHimmw',
		wjddbstj: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJYLUFwcC1SYXRlLUxpbWl0IjoiNTAwOjEwIiwiYWNjb3VudF9pZCI6IjE2ODMxNTI4NyIsImF1dGhfaWQiOiIyIiwiZXhwIjoxNzA4NjI2NTMyLCJpYXQiOjE2OTMwNzQ1MzIsIm5iZiI6MTY5MzA3NDUzMiwic2VydmljZV9pZCI6IjQzMDAxMTM5NyIsInRva2VuX3R5cGUiOiJBY2Nlc3NUb2tlbiJ9.6eVFGnPrxoJJUg9tfTG5QBrWGQdWznW8t-BaH_3Amn4',
		rlarjs: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJYLUFwcC1SYXRlLUxpbWl0IjoiNTAwOjEwIiwiYWNjb3VudF9pZCI6IjY3NTQxMTI1IiwiYXV0aF9pZCI6IjIiLCJleHAiOjE3MDg3MTk2NTAsImlhdCI6MTY5MzE2NzY1MCwibmJmIjoxNjkzMTY3NjUwLCJzZXJ2aWNlX2lkIjoiNDMwMDExMzk3IiwidG9rZW5fdHlwZSI6IkFjY2Vzc1Rva2VuIn0.-SnBX14WH6KIWheQ9UpaUbLc8JS6wKYEJ9kF8NKLedQ',
		wkddytpq: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJYLUFwcC1SYXRlLUxpbWl0IjoiNTAwOjEwIiwiYWNjb3VudF9pZCI6IjUzNzQyMDQ3NiIsImF1dGhfaWQiOiIyIiwiZXhwIjoxNzA4NzgxMDE3LCJpYXQiOjE2OTMyMjkwMTcsIm5iZiI6MTY5MzIyOTAxNywic2VydmljZV9pZCI6IjQzMDAxMTM5NyIsInRva2VuX3R5cGUiOiJBY2Nlc3NUb2tlbiJ9.ykto1jlYK3kRjYK-iCe4HrewaJwi40M_DvXiiXzVwso'
	}

  const promptApiKeyName = () => {
    console.log('프롬')
    const name:any = prompt('API 이름 입력')
    if(typeof name === 'string' && name?.length > 0){
      
      if(Object.keys(nameApiKey).includes(name)){
        apiKey.set(nameApiKey[name])
        cube_ready.set(false)
      }
      else alert('없는 키 값')
    }else{
      alert('다시 입력')
    }

  }

  const handleApiSetOnClick = () => {
		apiKey.set(key)
	}
</script>


<div class="w-2/6 h-2/6 m-auto text-center mt-6">
  <label for="api_key">
    <span>API 키 입력</span>
    <input id="api_key"
      class="border"
      bind:value={key}
    />
  </label>
  <button on:click={handleApiSetOnClick}>
    클릭
  </button>
  <div>
    <button on:click={promptApiKeyName}>
      이름 입력
    </button>
  </div>
  <div>
    <div>
      API 키 만들러 가기
    </div>
    <div>
      <a href="https://developers.nexon.com/Maplestory" target="_blank">사이트!</a>
    </div>
  </div>
</div>