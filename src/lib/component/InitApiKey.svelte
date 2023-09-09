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
  <div class="w-96 h-2/6 mb-4">
    <div class="mb-4">
      <h3 class="text-4xl font-bold">API 키 입력</h3>
    </div>
    <label for="api_key" class="border p-2">
      <input id="api_key"
        class="px-1 w-4/6 focus:outline-0"
        bind:value={key}
      />
      <button on:click={handleApiSetOnClick}>
        등록
      </button>
    </label>
    
    <div class="mt-4 flex flex-col items-center">
      <button class="inline-block w-4/6 border mb-2 p-4 bg-cyan-50 w-48" on:click={promptApiKeyName} >
        이름 입력
      </button>
      <button class="inline-block w-4/6 border mb-2 p-4 bg-cyan-50 w-48">
        <a href="https://developers.nexon.com/Maplestory" target="_blank">API KEY 생성 사이트!</a>
      </button>
    </div>
  </div>
  
</div>