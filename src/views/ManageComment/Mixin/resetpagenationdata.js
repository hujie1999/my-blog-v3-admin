import setting from '../../../setting'

export const resetpagenationdata = {
    data(){
        return {
            current_page:1,
            start:0,
            length:setting.commenttablelength,
            total_count:null,
            pagenation_key:null,

            //多选操作 所有选中的项
            multipleSelection: [],
            //多选操作按钮显示条件
            showmultibtn:true,
            //多选操作 评论或回复的Id 列表
            Comment_Id_List:null
        }
    },
    methods:{
        //页面改变，刷新分页器绑定的key更新视图
        setPagenationKey(){
            this.pagenation_key = new Date().getTime()
        },
        //页面改变，重置分页参数
        resetPageParam(){
            this.current_page = 1
            this.start = 0
            this.total_count = null
        },

        //评论审核 多选操作页面改变重置data
        resetMultiData(){
            this.multipleSelection = []
            this.showmultibtn = true 
            this.Comment_Id_List = null
        }
    }
}