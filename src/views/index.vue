<template>
  <div class="app-container calendar-list-container">
    <div v-show="searchToggle" ref="listQuery" class="filter-container">
      <el-row>
        <el-col :span="4">
          <el-input v-model="listQuery.userName" class="filter-item" placeholder="会员名" clearable @keyup.enter.native="handleFilter"/>
        </el-col>
        <el-col :span="4" style="padding-left: 5px">
          <el-input v-model="listQuery.customerName" class="filter-item" placeholder="客户名称" clearable @keyup.enter.native="handleFilter"/>
        </el-col>
        <el-col :span="4" style="padding-left: 5px">
          <el-input v-model="listQuery.customerAlias" class="filter-item" placeholder="客户别名" clearable @keyup.enter.native="handleFilter"/>
        </el-col>
        <el-col :span="4" style="padding-left: 5px">
          <el-input v-model="listQuery.mobile" class="filter-item" placeholder="手机号" clearable @keyup.enter.native="handleFilter"/>
        </el-col>
        <el-col :span="4" style="padding-left: 5px">
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
          <el-button class="filter-item" type="info" icon="el-icon-refresh" @click="resetting">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div v-show="!listLoading" class="filter-container" >
      <el-button v-if="tmConsignorInvoiceManager_btn_add" class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate">新增</el-button>
      <el-button v-if="tmConsignorInvoiceManager_btn_edit" type="success" class="filter-item" icon="el-icon-edit" @click="handleUpdate">修改</el-button>
      <el-button v-if="tmConsignorInvoiceManager_btn_del" class="filter-item" type="danger" icon="el-icon-delete" @click="handleDelete">删除</el-button>
      <el-button v-if="tmConsignorInvoiceManager_btn_show" type="warning" class="filter-item" icon="el-icon-edit" @click="handleShow">详情</el-button>
      <cruds
        :table-column="tableColumns"
        @refresh="handleFilter"
        @toggleSearch="toggleSearch"
        @fatherMethod="fatherMethod"/>
    </div>
    <el-table
      v-loading="listLoading"
      ref="table"
      :key="tableKey"
      :data="list"
      :max-height="tableHeight"
      :height="tableHeight"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @row-click="handleCurrentRowChange"
      @selection-change="handlerSelection">
      <el-table-column align="center" width="65px" type="selection"/>
      <el-table-column prop="userName" min-width="150px" align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="customerName" min-width="200px" align="center" label="客户名称">
        <template slot-scope="scope">
          <span>{{ scope.row.customerName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="customerAlias" min-width="200px" align="center" label="客户别名">
        <template slot-scope="scope">
          <span>{{ scope.row.customerAlias }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" min-width="100px" align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceMemo" min-width="300px" align="center" label="开票备注">
        <template slot-scope="scope">
          <span>{{ scope.row.invoiceMemo }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceMaxAmount" min-width="200px" align="center" label="货主最大开票金额">
        <template slot-scope="scope">
          <span>{{ scope.row.invoiceMaxAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceGroupRequire" min-width="300px" align="center" label="开票分组要求">
        <template slot-scope="scope">
          <span>{{ groupMap[scope.row.invoiceGroupRequire] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" min-width="150px" align="center" label="新增时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container" style="float: right;margin-top: 10px">
      <el-pagination :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :show-close="false">
      <el-form ref="form" :model="form" :rules="rules" :disabled="showForm" label-width="140px">
        <el-row>
          <el-col :span="11">
            <el-form-item label="货主ID" prop="consignorUserId" style="display:none">
              <el-input v-model="form.consignorUserId" placeholder="请输入货主ID"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item :readonly="true" label="货主名称" prop="customerName" @click.native="consignorNameClick()">
              <el-input v-model="form.customerName" suffix-icon="el-icon-zoom-in" placeholder="请输入货主名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="货主别名" prop="customerAlias" >
              <el-input v-model="form.customerAlias" :disabled="true" placeholder="请输入货主别名"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="会员名" prop="userName" >
              <el-input v-model="form.userName" :disabled="true" placeholder="请输入会员名"/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="form.mobile" :disabled="true" placeholder="请输入手机号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="开票备注" prop="invoiceMemo">
              <el-input v-model="form.invoiceMemo" placeholder="请输入开票备注"/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="最大开票金额" prop="invoiceMaxAmount">
              <el-input v-model="form.invoiceMaxAmount" placeholder="请输入最大开票金额"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="开票分组要求" prop="invoiceGroupRequire" >
              <template slot-scope="scope">
                <!--<el-checkbox v-for="city in cities" :label="city" :key="city" @change="checkBoxChange"> {{ city }} </el-checkbox>-->
                <el-checkbox-group v-model="checkList" @change="checkBoxChange">
                  <el-checkbox label="1">单价</el-checkbox>
                  <el-checkbox label="2">货物单位</el-checkbox>
                  <el-checkbox label="3">起始地目的地</el-checkbox>
                </el-checkbox-group>
              </template>
              <!--<el-input v-model="form.invoiceGroupRequire" placeholder="请输入开票分组要求"/>-->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button v-if="dialogStatus=='create'" type="primary" icon="el-icon-check" @click="create('form')">确 定</el-button>
        <el-button v-else-if="dialogStatus=='update'" type="primary" icon="el-icon-check" @click="update('form')">确 定</el-button>
        <el-button icon="el-icon-close" @click="cancel('form')">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogHistoryVisible" title="详情">
      <el-table
        v-loading.body="listLoadingHistory"
        :key="tableKeyHistoryShow"
        :data="listHistoryShow"
        width="100%"
        border
        fit
        highlight-current-row
        style="width: 100%" >
        <el-table-column align="center" label="客户名称">
          <template slot-scope="scope">
            <span>{{ scope.row.bakFieid1 }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="开票备注">
          <template slot-scope="scope">
            <span>{{ scope.row.invoiceMemo }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="货主最大开票金额">
          <template slot-scope="scope">
            <span>{{ scope.row.invoiceMaxAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="开票分组要求">
          <template slot-scope="scope">
            <span>{{ scope.row.invoiceGroupRequire }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作人">
          <template slot-scope="scope">
            <span>{{ scope.row.updateCname }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作时间">
          <template slot-scope="scope">
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoadingHistory" class="pagination-container" style="float: right;margin-top: 10px;" >
        <div style="float:left; margin-bottom: 10px">
          <el-pagination
            :current-page.sync="listQueryHistoryShow.page"
            :page-sizes="[10,20,30, 50]"
            :page-size="listQueryHistoryShow.limit"
            :total="totalHistoryShow"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChangeHistoryShow"
            @current-change="handleCurrentChangeHistoryShow"/>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center;margin-top: 40px;">
        <el-button icon="el-icon-close" @click="cancelHistory('formDictDetail')">关 闭</el-button>
      </div>
    </el-dialog>

    <user-single-select :show.sync="consignorSelectShow" :model.sync="userModelSelect" @userInfo="addConsignor"/>
  </div>
</template>

<script>
import {
  page,
  addObj,
  delObj,
  putObj,
  pageConsignorInvoiceHistory
} from '@/api/user-admin/member/consignorInvoice/index'
import { mapGetters } from 'vuex'
import { myMixyn } from '../../../components/Crud/crud'
import Cruds from '../../../components/Crud/Cruds'
import UserSingleSelect from '@/views/components/User/UserSingleSelect'
// const cityOptions = ['单价', '货物单位', '起始地目的地']
export default {
  name: 'ConsignorInvoice',
  components: { Cruds, UserSingleSelect },
  mixins: [myMixyn],
  data() {
    return {
      form: {
        consignorUserId: undefined,
        invoiceMemo: undefined,
        invoiceGroupRequire: undefined,
        invoiceMaxAmount: undefined,
        createTime: undefined,
        createId: undefined,
        createCname: undefined,
        updateTime: undefined,
        updateId: undefined,
        updateCname: undefined
      },
      rules: {
        invoiceMemo: [
          {
            required: true,
            message: '请输入开票备注',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ], invoiceMaxAmount: [
          {
            required: true,
            message: '请输入货主最大开票金额',
            trigger: 'blur'
          }
        ]
      },
      groupMap: {
        '1': '单价',
        '2': '货物单位',
        '3': '起始地目的地',
        '1,2': '单价,货物单位',
        '1,3': '单价,起始地目的地',
        '2,3': '货物单位,起始地目的地',
        '1,2.3': '单价,货物单位,起始地目的地'
      },
      selectedData: [],
      showForm: false,
      consignorSelectShow: false,
      checkList: [],
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        customerName: undefined,
        customerAlias: undefined,
        mobile: undefined,
        userName: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      tmConsignorInvoiceManager_btn_edit: false,
      tmConsignorInvoiceManager_btn_del: false,
      tmConsignorInvoiceManager_btn_add: false,
      tmConsignorInvoiceManager_btn_show: false,
      textMap: {
        update: '修改',
        create: '新增'
      },
      tableKey: 0,
      currentRow: undefined,

      userModelSelect: 1,
      dialogHistoryVisible: false,
      tableKeyHistoryShow: 1,
      listHistoryShow: null,
      totalHistoryShow: null,
      listLoadingHistory: true,
      listQueryHistoryShow: {
        page: 1,
        limit: 20,
        form: undefined
      },
      tableHeight: undefined
    }
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  created() {
    this.getList()
    this.tmConsignorInvoiceManager_btn_edit = this.elements['consignorInvoiceManager:btn_edit']
    this.tmConsignorInvoiceManager_btn_del = this.elements['consignorInvoiceManager:btn_del']
    this.tmConsignorInvoiceManager_btn_add = this.elements['consignorInvoiceManager:btn_add']
    this.tmConsignorInvoiceManager_btn_show = this.elements['consignorInvoiceManager:btn_show']
  },
  mounted: function() {
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 180
    console.log(this.tableHeight)
    this.listQueryHeight = this.$refs.listQuery.offsetHeight
  },
  methods: {
    getList() {
      this.listLoading = true
      page(this.listQuery)
        .then(response => {
          console.log(response)
          this.list = response.data.rows
          this.currentRow = this.list[0]
          this.total = response.data.total
          this.listLoading = false
        })
    },
    handleCurrentRowChange(row, event, column) {
      console.log(row, event, column)
      this.currentRow = row
    },
    handleFilter() {
      this.getList()
    },
    resetting() {
      this.listQuery = {
        page: 1,
        limit: 20
      }
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleCreate() {
      this.dialogHistoryVisible = false
      this.resetTemp()
      this.checkList = []
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate() {
      console.log(this.currentRow)
      Object.assign(this.form, this.currentRow)
      // getObj(row.id)
      if (this.currentRow) {
        if (this.currentRow.invoiceGroupRequire) {
          this.checkList = this.currentRow.invoiceGroupRequire.split(',')
          console.log('chenckList: ' + this.checkList)
        } else {
          this.checkList = []
        }
        this.dialogHistoryVisible = false
        this.dialogFormVisible = true
        this.dialogStatus = 'update'
      } else {
        this.$notify({
          title: '警告',
          message: '请选择列表行进行操作',
          type: 'warning'
        })
      }
    },
    handlerSelection(select) {
      this.selectedData = []
      if (select) {
        select.forEach(row => {
          if (row) {
            this.selectedData.push(row)
          }
        })
      }
    },
    handleDelete(row) {
      if (this.selectedData.length > 0) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            delObj(this.selectedData)
              .then(res => {
                if (res.status === 200) {
                  this.getList()
                  this.selectedData = []
                }
              })
          })
      }
    },
    create(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form)
            .then(() => {
              this.dialogFormVisible = false
              this.getList()
            })
        } else {
          return false
        }
      })
    },
    cancel(formName) {
      this.dialogFormVisible = false
      const set = this.$refs
      set[formName].resetFields()
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          putObj(this.form.id, this.form).then(() => {
            this.dialogFormVisible = false
            this.getList()
          })
        } else {
          return false
        }
      })
    },
    resetTemp() {
      this.form = {
      }
    },
    consignorNameClick() {
      this.consignorSelectShow = true
      this.userModelSelect = 1
      console.log(this.consignorSelectShow)
    },
    addConsignor(val) {
      console.log(val)
      this.form.consignorUserId = val.userId
      this.form.customerName = val.customerName
      this.form.customerAlias = val.customerAlias
      this.form.userName = val.userName
      this.form.mobile = val.mobile
      console.log(this.form)
    },
    checkBoxChange(checkList) {
      console.log(checkList)
      var sql = ''
      for (var i = 0; i < checkList.length; i++) {
        sql = sql + checkList[i] + ','
      }
      if (sql.indexOf(',') > -1) {
        sql = sql.substring(0, sql.length - 1)
      }
      console.log(sql)
      this.form.invoiceGroupRequire = sql
      console.log(this.form.invoiceGroupRequire)
    },
    handleShow() {
      if (this.currentRow) {
        console.log(this.currentRow)
        Object.assign(this.form, this.currentRow)
        this.form.createTime = new Date(this.form.createTime)
        this.form.updateTime = new Date(this.form.updateTime)
        this.dialogHistoryVisible = true
        this.getListShow(this.form)
      } else {
        this.$notify({
          title: '警告',
          message: '请选择列表行进行操作',
          type: 'warning'
        })
      }
    },
    getListShow(form) {
      console.log('form:' + form)
      this.listLoadingHistory = true
      this.listQueryHistoryShow.form = form
      pageConsignorInvoiceHistory(this.listQueryHistoryShow)
        .then(response => {
          console.log(response)
          this.listHistoryShow = response.data.rows
          this.totalHistoryShow = response.data.total
          this.listLoadingHistory = false
        })
    },
    handleSizeChangeHistoryShow(val) {
      this.listQueryHistoryShow.limit = val
      this.getListDictDetailShow(this.form)
    },
    handleCurrentChangeHistoryShow(val) {
      this.listQueryHistoryShow.page = val
      this.getListDictDetailShow(this.form)
    },
    cancelHistory(formName) {
      this.dialogHistoryVisible = false
      const set = this.$refs
      // this.resetTempDictDetail();
      set[formName].resetFields()
    },
    toggleSearch() {
      this.searchToggle = !this.searchToggle
      if (this.searchToggle) {
        this.tableHeight = this.tableHeight - this.listQueryHeight
      } else {
        this.tableHeight = this.tableHeight + this.listQueryHeight
      }
    }
  }
}
</script>
