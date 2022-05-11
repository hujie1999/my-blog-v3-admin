<template>
    <div id="manage-friend-link">
        <!-- <h1>Friend Link</h1> -->
        <FriendLinkTable
            :linklist='linklist'
            @showUpdate='handleUpdate'
            @showDelete='handleDelete'
        ></FriendLinkTable>
        <div class="add-link-btn">
            <el-button
            size="small"
            type="primary"
            @click="dialogFormVisible = true"
            >
            添加友链
            </el-button>
        </div>
        <FriendLinkPageNation
        :current="current"
        :total='count'
        :length="length"
        @handledPageParams='dealPageParams'
        ></FriendLinkPageNation>


        <el-dialog title="添加友链" 
        :visible.sync="dialogFormVisible"
        :before-close="handleDiaClose"
        >
            <el-form :model="form">
                <el-form-item label="友链头像地址" :label-width="formLabelWidth">
                    <el-input 
                    v-model="form.FriendWebAvatar"
                    maxlength="500"
                    style="width:400px"
                    :autosize="{ minRows: 3, maxRows: 5}"
                    type="textarea"
                    show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="友链网站名称" :label-width="formLabelWidth">
                    <el-input 
                    v-model="form.FriendWebName"
                    maxlength="50"
                    style="width:400px"
                    show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="友链网站描述" :label-width="formLabelWidth">
                    <el-input
                    v-model="form.FriendWebDesc" 
                    :autosize="{ minRows: 3, maxRows: 5}"
                    maxlength="100"
                    type="textarea"
                    style="width:400px"
                    show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="友链网站链接" :label-width="formLabelWidth">
                    <el-input 
                    v-model="form.FriendWebLink"
                    maxlength="500"
                    style="width:400px"
                    show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="友链网站所有者" :label-width="formLabelWidth">
                    <el-input 
                    v-model="form.FriendName"
                    maxlength="20"
                    style="width:400px"
                    show-word-limit
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitLinkForm">提 交</el-button>
            </div>
            </el-dialog>

            <el-drawer
                title="修改用户"
                :visible.sync="drawer"
                :before-close="handleDrawerClose"
                size="35%">
                <div class="inner-content">
                    <el-form ref="form" :model="form" label-width="100px">
                         <el-form-item label="友链头像地址" :label-width="formLabelWidth">
                        <el-input 
                        v-model="form.FriendWebAvatar"
                        maxlength="500"
                        style="width:400px"
                        :autosize="{ minRows: 3, maxRows: 5}"
                        type="textarea"
                        show-word-limit
                        ></el-input>
                        </el-form-item>
                        <el-form-item label="友链网站名称" :label-width="formLabelWidth">
                            <el-input 
                            v-model="form.FriendWebName"
                            maxlength="50"
                            style="width:400px"
                            show-word-limit
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="友链网站描述" :label-width="formLabelWidth">
                            <el-input
                            v-model="form.FriendWebDesc" 
                            :autosize="{ minRows: 3, maxRows: 5}"
                            maxlength="100"
                            type="textarea"
                            style="width:400px"
                            show-word-limit
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="友链网站链接" :label-width="formLabelWidth">
                            <el-input 
                            v-model="form.FriendWebLink"
                            maxlength="500"
                            style="width:400px"
                            show-word-limit
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="友链网站所有者" :label-width="formLabelWidth">
                            <el-input 
                            v-model="form.FriendName"
                            maxlength="20"
                            style="width:400px"
                            show-word-limit
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="updateFriendLink" type="success" 
                            style="width:100px;height:35px;margin:30px 0px 20px 0px">提交修改</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-drawer>
    </div>
</template>

<script>
import FriendLinkTable from '../TableTemplate/FriendLinkTable.vue'
import FriendLinkPageNation from '../PageNation/FriendLinkPageNation.vue'

import setting from '@/setting.js'
import {
    getallfriendlinkAPI,
    getallfriendlinkcountAPI,
    addfriendlinkAPI,
    deletefriendlinkAPI,
    updatefriendlinkAPI
} from '@/http/api'
export default {
    name:'FriendLink',
    data(){
        return{
            //page
            start:0,
            length:setting.friendlinktablelength,
            current:1,
            count:0,
            //friend link data
            linklist:[],
            //dialog
            dialogFormVisible:false,
            formLabelWidth: '120px',
            //drawer
            drawer:false,
            //dialog & drawer 's public data
            form: {
                FriendWebAvatar: '',
                FriendWebName: '',
                FriendWebDesc: '',
                FriendWebLink: '',
                FriendName: '',
                id:null
            },

        }
    },
    components:{
        FriendLinkTable,
        FriendLinkPageNation
    },
    created(){
        this.getAllFriendLink()
        this.getAllFriendLinkCount()
    },
    methods:{
        handleUpdate(idx,row){
            this.form  = row
            this.drawer = true
        },
        handleDelete(idx,row){
            this.$confirm('是否确定删除该友链?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deletefriendlinkAPI({id:row.id})
                .then(res=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.count--
                })
                .catch(err=>{
                    this.$message({
                        type: 'error',
                        message: '删除失败!'
                    });
                })
                .finally(()=>{
                    this.getAllFriendLink()
                })
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            

        },
        dealPageParams(c,s){
            this.current = c
            this.start = s
            this.getAllFriendLink()
        },
        //获取友链
        getAllFriendLink(){
            getallfriendlinkAPI({start:this.start,length:this.length})
                .then(res=>{
                    this.linklist = Object.values(res.data)
                })
                .catch(err=>{console.log(err)})
        },
        //获取友链count
        getAllFriendLinkCount(){
            getallfriendlinkcountAPI()
                .then(res=>{
                    this.count = Object.values(res.data)[0].count
                })
                .catch(err=>{console.log(err)})
        },
        //关闭dialog
        handleDiaClose(done){
             this.$confirm('确认关闭？')
            .then(_ => {     
                done();
            })
            .catch(_ => {});
        },
        //doalog提交添加友链
        async submitLinkForm(){
            await addfriendlinkAPI({form:this.form})
                .then(res=>{
                    this.$notify({
                        title: '成功',
                        message: '友链添加成功！',
                        type: 'success'
                    });
                })
                .catch(err=>{console.log(err)})
                .finally(()=>{this.dialogFormVisible = false})
            await this.getAllFriendLink()
        },
        //关闭drawer
        handleDrawerClose(done) {
            this.$confirm('确认取消编辑？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        //drawer 提交友链修改
        async updateFriendLink(){
            await updatefriendlinkAPI({form:this.form})
                .then(res=>{
                    this.$notify({
                        title: '成功',
                        message: '友链修改成功！',
                        type: 'success'
                    });
                })
                .catch(err=>{console.log(err)})
                .finally(()=>{this.drawer = false})
            await this.getAllFriendLink()
        },
        //reset form
        resetForm(){
            this.form = {
                FriendWebAvatar: '',
                FriendWebName: '',
                FriendWebDesc: '',
                FriendWebLink: '',
                FriendName: '',
                id:null
            }
        }
    },
    watch:{
        dialogFormVisible:{
            handler(newVal,oldVal){
                if(newVal===false){
                    this.resetForm()
                }
            }
        },
        drawer:{
            handler(newVal,oldVal){
                if(newVal===false){
                    this.resetForm()
                }
            },
            immediate:true
        },
    }
}

</script>

<style lang='less' scoped>
#manage-friend-link{
    padding: 0px 10px;


    .add-link-btn{
        padding: 10px 0px;
    }

}
</style>