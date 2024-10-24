import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../ApiService/apiService";

export const submitTask = createAsyncThunk("submissions/submitTask",
    async(submitData)=>{
      
    
        setAuthHeader(localStorage.getItem("jwt"),api)
        try{
            const {data} = await api.post(`/api/submissions/submit`,submitData)
            console.log("submitted task",data)
            return data
        }catch(error){
            console.log("catch",error)
            throw Error(error.response.data.error)
        }
    }
)

export const fetchAllSubmissions = createAsyncThunk("submissions/fetchAllSubmissions",
    async()=>{
        setAuthHeader(localStorage.get("jwt"),api)
        try{
            const {data} = await api.get("/api/submissions/all")
            console.log("All Submissions fetched",data)
            return data
        }catch(error){
            console.log("catch",error)
            throw Error(error.response.data.error)
        }
    }
)

export const fetchSubmissionByTaskId = createAsyncThunk("submissions/fetchSubmissionByTaskId",
    async(taskId)=>{
        console.log("Task ID fetching")
        setAuthHeader(localStorage.getItem("jwt"),api)
        try{
            console.log(taskId)
            const {data} = await api.get(`/api/submissions/task/${taskId}`)
            console.log("Submission BY TaskId",data)
            return data
        }catch(error){
            console.log("catch",error)
            throw Error(error.response.data.error)
        }
    }
)

export const acceptDeclineSubmission = createAsyncThunk("submissions/accpetDeclineSubmission",
    async({id,status})=>{
       
        setAuthHeader(localStorage.getItem("jwt"),api)
        try{
            
            const {data} = await api.put(`/api/submissions/review/${id}?status=${status}`)
            console.log("Review Done",data)
            return data
        }catch(error){
            console.log("catch",error)
            throw Error(error.response.data.error)
        }
    }
)

export const fetchSubmissionById = createAsyncThunk("submissions/fetchSubmissionById",
    async(id)=>{
        setAuthHeader(localStorage.get("jwt"),api)
        try{
            const {data} = await api.get(`/api/submissions/${id}`)
            console.log("Submission By Id fetched",data)
            return data
        }catch(error){
            console.log("catch",error)
            throw Error(error.response.data.error)
        }
    }
)

const SubmissionSlice = createSlice({
    name:"submissions",
    initialState:{
        submissions:[],
        status:'',
        error:null,
        taskSubmissions:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(submitTask.pending,(state)=>{
            state.status='loading'
        })
        .addCase(submitTask.fulfilled,(state,action)=>{
            state.state='success'
            state.submissions.push(action.payload)
        })
        .addCase(submitTask.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(fetchAllSubmissions.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAllSubmissions.fulfilled, (state, action) => {
            state.status = 'success';
            console.log(action.payload)
            state.submissions = action.payload;
        })
        .addCase(fetchAllSubmissions.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(fetchSubmissionByTaskId.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchSubmissionByTaskId.fulfilled, (state, action) => {
            state.status = 'success';
            state.taskSubmissions = action.payload;
        })
        .addCase(fetchSubmissionByTaskId.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(acceptDeclineSubmission.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(acceptDeclineSubmission.fulfilled, (state, action) => {
            state.status = 'success';
            state.submissions = state.submissions.map((item)=>item.id!==action.payload.id?item:action.payload)
        })
        .addCase(acceptDeclineSubmission.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(fetchSubmissionById.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchSubmissionById.fulfilled, (state, action) => {
            state.status = 'success';
            state.submissions.push(action.payload);
        })
        .addCase(fetchSubmissionById.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
})

export default SubmissionSlice.reducer;


