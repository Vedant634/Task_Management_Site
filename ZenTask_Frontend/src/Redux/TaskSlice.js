import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../ApiService/apiService";

export const fetchTasks  =createAsyncThunk("tasks/fetchTasks",async(status)=>{

    setAuthHeader(localStorage.getItem("jwt"),api)
        try{
            const {data}  = await api.get("api/tasks/all",{
                params:{status: status.status || status }
            })
            console.log("fetch task :",data)
            return data
        } catch(error){
            console.log("error")
            throw Error(error.response.data.error)
        }
})

export const fetchUserTasks  =createAsyncThunk("tasks/fetchUserTasks",async(status)=>{
    setAuthHeader(localStorage.getItem("jwt"),api)

    try{
        const {data}  =await api.get("api/tasks/user",{
            params:{status: status.status || status }
        })
        console.log("fetch User task :",data)
        return data
    } catch(error){
        console.log("error")
        throw Error(error.response.data.error)
    }
})

export const fetchTaskById  =createAsyncThunk("tasks/fetchTaskById",async(taskId)=>{
    setAuthHeader(localStorage.getItem("jwt"),api)

    try{
        const {data}  =await api.get(`api/tasks/${taskId}`)
        console.log("fetch task BY Id :",data)
        return data
    } catch(error){
        console.log("error")
        throw Error(error.response.data.error)
    }
})

export const createTask  =createAsyncThunk("tasks/createTask",async(taskData)=>{
    setAuthHeader(localStorage.getItem("jwt"),api)

    try{
        const {data}  = await api.post("api/tasks/create",taskData)
        console.log("Create Task trying :",data)
        return data
    } catch(error){
        console.log("error")
        throw Error(error.response.data.error)
    }
})

export const updateTask  =createAsyncThunk("tasks/updateTask",async({id,taskData})=>{
    setAuthHeader(localStorage.getItem("jwt"),api)
   
    try{
        const {data}  =await api.put(`api/tasks/update/${id}`,taskData)
        console.log("Update Task :",data)
        return data
    } catch(error){
        console.log("error")
        throw Error(error.response.data.error)
    }
})

export const assignedTaskToUSer  =createAsyncThunk("tasks/assignedTaskToUser",async({taskId,userId})=>{
    setAuthHeader(localStorage.getItem("jwt"),api)
    console.log("UserId",taskId)
    try{
        const {data}  =await api.put(`api/tasks/${taskId}/user/${userId}/assigned`)
        console.log("Task Assigned :",data)
        return data
    } catch(error){
        console.log("error")
        throw Error(error.response.data.error)
    }
})

export const deleteTask  =createAsyncThunk("tasks/deleteTask",async(taskId)=>{
    setAuthHeader(localStorage.getItem("jwt"),api)

    try{
        const {data}  = await api.delete(`api/tasks/delete/${taskId}`)
        console.log("Delete Task :",data)
        return taskId
    } catch(error){
        console.log("error")
        throw Error(error.response.data.error)
    }
})

const taskSlice = createSlice({
    name:"tasks",
    initialState:{
        tasks:[],
        loading:false,
        error:null,
        taskDetails:null,
        userTasks:[]

    },
    reducer:{},
    extraReducers:(builder) =>{
        builder
        .addCase(fetchTasks.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(fetchTasks.fulfilled,(state,action)=>{
            state.loading=true,
            state.tasks= action.payload
        })
        .addCase(fetchTasks.rejected,(state,action)=>{
            state.error = action.error.message
            state.loading=false
        })
        .addCase(fetchTaskById.fulfilled,(state,action)=>{
            state.loading=true,
            state.taskDetails= action.payload
        })
        .addCase(fetchUserTasks.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(fetchUserTasks.fulfilled,(state,action)=>{
            state.loading=true,
            state.userTasks= action.payload
        })
        .addCase(fetchUserTasks.rejected,(state,action)=>{
            state.error = action.error.message
            state.loading=false
        })
        .addCase(createTask.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(createTask.fulfilled,(state,action)=>{
            state.loading=true,
            state.tasks.push(action.payload)
        })
        .addCase(createTask.rejected,(state,action)=>{
            state.error = action.error.message
            state.loading=false
        })
        .addCase(updateTask.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(updateTask.fulfilled,(state,action)=>{
            const updatedTask = action.payload
            state.loading=false,
            state.tasks = state.tasks.map((task) =>
                task.id === updatedTask.id ? { ...task, ...updatedTask } : task
            );
        })
        .addCase(updateTask.rejected,(state,action)=>{
            state.error = action.error.message
            state.loading=false
        })
        .addCase(assignedTaskToUSer.fulfilled, (state, action) => {
            const updatedTask = action.payload;
            state.loading = false;  
            state.tasks = state.tasks.map((task) =>
              task.id === updatedTask.id ? { ...task, ...updatedTask } : task
            );
          })
        .addCase(deleteTask.fulfilled,(state,action)=>{
            
            state.loading=true,
            state.tasks= state.tasks.filter((task)=>task.id!==action.payload)
        })
    }
})

export default taskSlice.reducer;