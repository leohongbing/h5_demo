/**
 * Created by cy on 2020/4/29
 *
 * Description:
 * <p>
 */
export default {
  data() {
    return {
      rules:{
        companyInfoID: [
          { required: true, message: '客户名称', trigger: 'blur' },
        ],
        companyID: [
          { required: true, message: '成员单位', trigger: 'blur' }
        ]
      }
    }
  }
}
