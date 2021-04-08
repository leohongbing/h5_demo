<template>
  <el-dialog v-if="messageObject != undefined"
             id="dialog_message"
             name="dialog_message_box"
             title="提示"
             :visible.sync="messageObject.messageDialogVisible"
             size="tiny"
             :modal="model"
             :before-close="cancelClose"
             top="10px"
             :close-on-click-modal="false">
    <div class="message">
      <span v-if="messageObject.messageType == 'success'" class="icon">
          <i class="el-icon-circle-check" style="color: #13CE66"></i>
      </span>
      <span v-if="messageObject.messageType == 'error'" class="icon">
        <i class="el-icon-circle-cross" style="color: #FF4949"></i>
      </span>
      <span v-if="messageObject.messageType == 'info'" class="icon">
        <i class="el-icon-information" style="color: #20A0FF"></i>
      </span>
      <span v-if="messageObject.messageType == 'warning'" class="icon">
        <i class="el-icon-warning" style="color: #F7BA2A"></i>
      </span>
      <span v-if="messageObject.messageType == 'remind'" class="icon">
        <i class="el-icon-warning" style="color: #F7BA2A"></i>
      </span>
      <span v-if="messageObject.messageType == 'ok'" class="icon">
        <!-- BUG-P1:ESN-31595 解决问题: 【升级问题】新建编辑活动的时候，有些告知性的提示，按钮显示为“确定”‘取消“，需要修改下 -->
        <i class="el-icon-warning" style="color: #F7BA2A"></i>
        <!--        <i class="el-icon-information" style="color: #20A0FF"></i>-->
      </span>
      <div class="message_content">
        <span>{{messageObject.message}}</span>
      </div>
    </div>

    <div v-if="messageObject.messageType == 'ok'" slot="footer" class="dialog-footer" style="text-align: center">
      <el-button type="primary" @click="confirmClose">好 的</el-button>
    </div>
    <!--BUG-P1/ESN-32207 解决渠道管理和渠道推广管理，如图弹出的提示，请把样式统一，按钮都叫“好的”，在中间-->
    <div v-else-if="messageObject.messageType == 'remind'" slot="footer" class="dialog-footer" style="text-align: center">
      <el-button type="primary" @click="cancelClose">好 的</el-button>
    </div>
    <div v-else-if="messageObject.messageType == 'error'" slot="footer" class="dialog-footer" style="text-align: center">
      <el-button type="primary" @click="cancelClose">好 的</el-button>
    </div>
    <div v-else slot="footer" class="dialog-footer">
      <el-button type="primary" v-if="!messageObject.noConfirmBtn" @click="confirmClose">确 定</el-button>
      <el-button v-if="messageObject.messageType == 'warning'" @click="cancelClose">取 消</el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss">
  #dialog_message {
    .message {
      color: #48576a;
      font-size: 14px;
      position: relative;
      margin-bottom: 20px;
    }

    .icon {
      color: #F7BA2A;
      font-size: 36px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .message_content {
      margin: 0 0 0 50px;
    }
  }
</style>
<script>
  import '../../utils/CRSMessager'

  export default {
    name: 'message_box',
    props: {
      messageObject: Object
    },
    data() {
      return {
        model: false
      }
    },
    mounted() {
      this.calculateMessagePosition();
    },
    methods: {
      initBoxHeight(height) {
        let domList = document.getElementsByName("dialog_message_box");
        if (undefined != domList && 0 != domList.length) {
          for (let i = 0; i < domList.length; i++) {
            let tempDom = domList[i];
            tempDom.style.top = height;
          }
        }
      },
      cancelClose() {
        let messageObject = {
          message: '',
          messageType: '',
          messageDialogVisible: false,
          messageOperation: ''
        }
        this.$emit('closeMessage', messageObject);
      },
      confirmClose() {
        let messageObject = this.messageObject;
        messageObject.messageDialogVisible = false;
        this.$emit('closeMessage', messageObject);
      },
      calculateMessagePosition: function () {
        let _height = 0;
        let _this = this;
        CRSMessager.invokeCRSMethod(window.parent, "getParentWindowHeight", null, function (param) {
          if (!param) {
            return;
          }
          _height = (param - 329) / 2;
          _height += "px";
          _this.initBoxHeight(_height);
          let editorHeight = (param - 129) / 2;
          editorHeight += "px";
          let editors = document.getElementsByClassName("_2T9WD2D47RUUwZfCP40fYJ_0");
          if (undefined != editors && 0 != editors.length) {
            for (let i = 0; i < editors.length; i++) {
              let editor = editors[i];
              editor.style.top = editorHeight;
            }
          }
        });

        CRSMessager.bindCRSEvent("calculateHeight", function (e) {
          let param = e;
          let clientHeight = param.clientHeight;
          let windowHeight = param.windowHeight;
          let scrollTop = param.scrollTop;
          if (undefined != windowHeight && undefined != scrollTop) {
            let height = (windowHeight - 329) / 2 + scrollTop;
            height += "px";
            let domList = document.getElementsByName("dialog_message_box");
            if (undefined != domList && 0 != domList.length) {
              for (let i = 0; i < domList.length; i++) {
                let tempDom = domList[i];
                tempDom.style.top = height;
              }
            }
            let editorHeight = (windowHeight - 129) / 2 + scrollTop;
            editorHeight += "px";
            let editors = document.getElementsByClassName("_2T9WD2D47RUUwZfCP40fYJ_0");
            if (undefined != editors && 0 != editors.length) {
              for (let i = 0; i < editors.length; i++) {
                let editor = editors[i];
                editor.style.top = editorHeight;
              }
            }
          }
        })
      }
    }
  };
</script>
