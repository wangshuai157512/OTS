const host = '';
// const domainName = 'https://otstest.chinaedu.net:8443/mini/';
// const domainName = 'https://otstest.chinaedu.net:8443/mini/app/ots/';
// const domainName = 'https://otstest.chinaedu.net:8443/mini/app/ots/';
const domainName = 'https://exam.chinaedu.net/oxer/app/ots/';


/**
 * 公共接口路径
 */
const api = {
    login : 'https://exam.chinaedu.net/oxer/auth/ots',
    checkCodeApi : 'https://exam.chinaedu.net/oxer/checkCode',
  // login: 'https://otstest.chinaedu.net:8443/mini/auth/ots',
  // checkCodeApi: 'https://otstest.chinaedu.net:8443/mini/checkCode',
    // 获取主分类主层级分类项列表
    GetMainCategoryMainLevelItemList: domainName + 'QuestionsManage/QuestionCategory/GetMainCategoryMainLevelItemList',
    // 根据代码获取主分类主层级分类项列表
    GetMainCategoryMainLevelItemListByCode: domainName + 'QuestionsManage/QuestionCategory/GetMainCategoryMainLevelItemListByCode',
    // 获取分类项树
    GetCategoryItemTree: domainName + 'QuestionsManage/QuestionCategory/GetCategoryItemTree',
    // 保存分类项
    SaveQuestionCategoryItem: domainName + 'QuestionsManage/QuestionCategory/SaveQuestionCategoryItem',
    // 查询分类项（单条、编辑用）
    QueryQuestionCategoryItemByCode: domainName + 'QuestionsManage/QuestionCategory/QueryQuestionCategoryItemByCode',
    // 查询分类项树
    QueryCategoryItemTreeByName: domainName + 'QuestionsManage/QuestionCategory/QueryCategoryItemTreeByName',
    // 获取分类项子节点列表
    QueryChildQuestionCategoryItem: domainName + 'QuestionsManage/QuestionCategory/QueryChildQuestionCategoryItem',
    // 获取关联分类项列表
    QueryRelationQuestionCategoryItem: domainName + 'QuestionsManage/QuestionCategory/QueryRelationQuestionCategoryItem',
    // 操作分类项
    OperateQuestionCategoryItem: domainName + 'QuestionsManage/QuestionCategory/OperateQuestionCategoryItem',
    // 删除分类项
    RemoveQuestionCategoryItem: domainName + 'QuestionsManage/QuestionCategory/RemoveQuestionCategoryItem',
    // 导出分类项(有导出编码时，按导出编码导出；无导出编码时按编码、名称状态查询后导出)
    ExportQuestionCategoryItem: domainName + 'QuestionsManage/QuestionCategory/ExportQuestionCategoryItem',
    // 保存分类项（课程分类）
    SaveQuestionCategoryTypeItem: domainName + 'QuestionsManage/QuestionCategory/SaveQuestionCategoryTypeItem',
    // 查询分类项（单条、编辑用）（课程分类）
    QueryQuestionCategoryTypeItemByCode: domainName + 'QuestionsManage/QuestionCategory/QueryQuestionCategoryTypeItemByCode',
    // 查询分类项树（课程分类）
    QueryCategoryTypeItemTreeByName: domainName + 'QuestionsManage/QuestionCategory/QueryCategoryTypeItemTreeByName',
    // 获取分类项子节点列表（课程分类）
    QueryChildQuestionCategoryTypeItem: domainName + 'QuestionsManage/QuestionCategory/QueryChildQuestionCategoryTypeItem',
    // 获取关联分类项列表（课程分类）
    QueryRelationQuestionCategoryTypeItem: domainName + 'QuestionsManage/QuestionCategory/QueryRelationQuestionCategoryTypeItem',
    // 操作分类项（课程分类）
    OperateQuestionCategoryTypeItem: domainName + 'QuestionsManage/QuestionCategory/OperateQuestionCategoryTypeItem',
    // 删除分类项（课程分类）
    RemoveQuestionCategoryTypeItem: domainName + 'QuestionsManage/QuestionCategory/RemoveQuestionCategoryTypeItem',
    // 导出分类项(有导出编码时，按导出编码导出；无导出编码时按编码、名称状态查询后导出)（课程分类）
    ExportQuestionCategoryTypeItem: domainName + 'QuestionsManage/QuestionCategory/ExportQuestionCategoryTypeItem',
    // 保存分类项（课程结构）
    SaveQuestionCategoryChildItem: domainName + 'QuestionsManage/QuestionCategory/SaveQuestionCategoryChildItem',
    // 查询分类项（单条、编辑用）（课程结构）
    QueryQuestionCategoryChildItemByCode: domainName + 'QuestionsManage/QuestionCategory/QueryQuestionCategoryChildItemByCode',
    // 查询分类项树（课程结构）
    QueryCategoryChildItemTreeByName: domainName + 'QuestionsManage/QuestionCategory/QueryCategoryChildItemTreeByName',
    // 获取分类项子节点列表（课程结构）
    QueryChildQuestionCategoryChildItem: domainName + 'QuestionsManage/QuestionCategory/QueryChildQuestionCategoryChildItem',
    // 获取关联分类项列表（课程结构）
    QueryRelationQuestionCategoryChildItem: domainName + 'QuestionsManage/QuestionCategory/QueryRelationQuestionCategoryChildItem',
    // 操作分类项（课程结构）
    OperateQuestionCategoryChildItem: domainName + 'QuestionsManage/QuestionCategory/OperateQuestionCategoryChildItem',
    // 删除分类项（课程结构）
    RemoveQuestionCategoryChildItem: domainName + 'QuestionsManage/QuestionCategory/RemoveQuestionCategoryChildItem',
    // 导出分类项(有导出编码时，按导出编码导出；无导出编码时按编码、名称状态查询后导出)（课程结构）
    ExportQuestionCategoryChildItem: domainName + 'QuestionsManage/QuestionCategory/ExportQuestionCategoryChildItem',
    // 修改分类项顺序
    ChangeQuestionCategoryItemSequence: domainName + 'QuestionsManage/QuestionCategory/ChangeQuestionCategoryItemSequence',
    // 获取主分类及课程列表
    QueryCategoryItemAndCourseInfo: domainName + 'QuestionsManage/QuestionCategory/QueryCategoryItemAndCourseInfo',
    // 跟业务系统进行课程编码同步
    SynchronizeCourse: domainName + 'QuestionsManage/QuestionCategory/SynchronizeCourse',
    // 根据章节点获取知识点
    GetCategoryCodeByTopicCode: domainName + 'QuestionsManage/QuestionCategory/GetCategoryCodeByTopicCode',
    // 通过条件查询试题列表
    QueryQuestionListByCondition: domainName + 'QuestionsManage/QuestionQuery/QueryQuestionListByCondition',
    // 通过id查询重复试题列表
    QuerySimilarQuestionsById: domainName + 'QuestionsManage/QuestionQuery/QuerySimilarQuestionsById',
    // 计算试题相似度得分
    ComputeQuestionSimilarScore: domainName + 'QuestionsManage/QuestionQuery/ComputeQuestionSimilarScore',
    // 查询需修改扩展参数的题目库存
    QueryQuestionStockForModifyExtAttr: domainName + 'QuestionsManage/QuestionQuery/QueryQuestionStockForModifyExtAttr',
    // 查询需修改扩展参数的题目列表
    QueryQuestionsForModifyExtAttr: domainName + 'QuestionsManage/QuestionQuery/QueryQuestionsForModifyExtAttr',
    // 替换需修改扩展参数的题目
    ReplaceQuestionForModifyExtAttr: domainName + 'QuestionsManage/QuestionQuery/ReplaceQuestionForModifyExtAttr',
    // 审核通过
    AuditThroughQuestion: domainName + 'QuestionsManage/QuestionListOperate/AuditThroughQuestion',
    // 审核不通过
    AuditNotThroughQuestion: domainName + 'QuestionsManage/QuestionListOperate/AuditNotThroughQuestion',
    // 停用
    DisableQuestions: domainName + 'QuestionsManage/QuestionListOperate/DisableQuestions',
    // 启用
    EnableQuestions: domainName + 'QuestionsManage/QuestionListOperate/EnableQuestions',
    // 删除
    DeleteQuestions: domainName + 'QuestionsManage/QuestionListOperate/DeleteQuestions',
    // 全部审核通过
    AuditThroughAllQuestion: domainName + 'QuestionsManage/QuestionListOperate/AuditThroughAllQuestion',
    // 全部审核不通过
    AuditNotThroughAllQuestion: domainName + 'QuestionsManage/QuestionListOperate/AuditNotThroughAllQuestion',
    // 全部停用
    DisableAllQuestions: domainName + 'QuestionsManage/QuestionListOperate/DisableAllQuestions',
    // 全部启用
    EnableAllQuestions: domainName + 'QuestionsManage/QuestionListOperate/EnableAllQuestions',
    // 全部删除
    DeleteAllQuestions: domainName + 'QuestionsManage/QuestionListOperate/DeleteAllQuestions',
    // 批量修改属性
    batchUpdateQuestion: domainName + 'QuestionsManage/QuestionListOperate/batchUpdateQuestion',
    // 批量修改题目扩展参数
    ModifyQuestionsExtAttr: domainName + 'QuestionsManage/QuestionListOperate/ModifyQuestionsExtAttr',
    // 添加试题知识点
    addQuestionCategoryRelation: domainName + 'QuestionsManage/QuestionListOperate/addQuestionCategoryRelation',
    // 查询课程下待处理题目数量
    queryPendingQuestionNumByCourseCode: domainName + 'QuestionsManage/QuestionListOperate/queryPendingQuestionNumByCourseCode',
    // 是否允许私有
    questionPrivateConfig: domainName + 'QuestionsManage/QuestionInput/questionPrivateConfig',
    // 批量保存题目属性
    BatchSaveQuestionAttribute: domainName + 'QuestionsManage/QuestionInput/BatchSaveQuestionAttribute',
    // 题型列表
    GetQuestionTypeList: domainName + 'QuestionsManage/QuestionInput/GetQuestionTypeList',
    // 复合题型子题型列表
    GetSubQuestionTypeList: domainName + 'QuestionsManage/QuestionInput/GetSubQuestionTypeList',
    // 难度列表
    GetDifficultyValues: domainName + 'QuestionsManage/QuestionInput/GetDifficultyValues',
    // 增加子题目
    addSubQuestion: domainName + 'QuestionsManage/QuestionInput/addSubQuestion',
    // 改变子题目顺序
    ChangeSubQuestionSequence: domainName + 'QuestionsManage/QuestionInput/ChangeSubQuestionSequence',
    // 删除子题目
    removeSubQuestion: domainName + 'QuestionsManage/QuestionInput/removeSubQuestion',
    // 复制题目
    CopyQuestion: domainName + 'QuestionsManage/QuestionInput/CopyQuestion',
    // 保存题目
    SaveQuestion: domainName + 'QuestionsManage/QuestionInput/SaveQuestion',
    //实验班 --- 试题同步
    SendQuestionSyncData: domainName + "QuestionsManage/QuestionInput/SendQuestionSyncData",
    // 提交题目
    SubmitQuestion: domainName + 'QuestionsManage/QuestionInput/SubmitQuestion',
    // 试题导入
    ImportQuestions: domainName + 'QuestionsManage/QuestionImport/ImportQuestions',
    //
    DownloadImportInstruction: domainName + 'QuestionsManage/QuestionImport/DownloadImportInstruction',
    //
    DownloadTemplate: domainName + 'QuestionsManage/QuestionImport/DownloadTemplate',
    //
    SubmitImport: domainName + 'QuestionsManage/QuestionImport/SubmitImport',
    //
    ImportError: domainName + 'QuestionsManage/QuestionImport/ImportError',
    //
    SaveErrorInfo: domainName + 'QuestionsManage/QuestionImport/SaveErrorInfo',
    // 保存试题类型
    SaveQuestionType: domainName + 'QuestionsManage/QuestionType/SaveQuestionType',
    // 查询试题类型
    QueryQuestionTypeById: domainName + 'QuestionsManage/QuestionType/QueryQuestionTypeById',
    // 获取试题类型列表
    QueryQuestionTypeByConditions: domainName + 'QuestionsManage/QuestionType/QueryQuestionTypeByConditions',
    // 操作试题类型
    OperateQuestionType: domainName + 'QuestionsManage/QuestionType/OperateQuestionType',
    // 删除试题类型
    RemoveQuestionType: domainName + 'QuestionsManage/QuestionType/RemoveQuestionType',
    // 查询可用子题型
    QueryCanUseSubQuestionType: domainName + 'QuestionsManage/QuestionType/QueryCanUseSubQuestionType',
    // 查询所有试题类型模板
    QueryAllQuestionTypeTemplate: domainName + 'QuestionsManage/QuestionType/QueryAllQuestionTypeTemplate',
    // 获取试卷分类列表
    GetCategoryList: domainName + 'PapersManage/PaperCategory/GetCategoryList',
    // 保存试卷分类
    SaveCategory: domainName + 'PapersManage/PaperCategory/SaveCategory',
    // 删除试卷分类
    RemoveCategories: domainName + 'PapersManage/PaperCategory/RemoveCategories',
    // 通过条件查询试卷列表
    QueryPaperListByCondition: domainName + 'PapersManage/PaperQuery/QueryPaperListByCondition',
    // 查询能够合并的试卷列表
    QueryMergeablePaperList: domainName + 'PapersManage/PaperQuery/QueryMergeablePaperList',
    // 预览试卷
    PreviewPaper: domainName + 'PapersManage/PaperQuery/PreviewPaper',
    // 检查试卷是否被使用
    CheckPaperUsed: domainName + 'PapersManage/PaperQuery/CheckPaperUsed',
    // 启用试卷
    EnablePapers: domainName + 'PapersManage/PaperListOperate/EnablePapers',
    // 停用试卷
    DisablePapers: domainName + 'PapersManage/PaperListOperate/DisablePapers',
    // 删除试卷
    RemovePapers: domainName + 'PapersManage/PaperListOperate/RemovePapers',
    // 导出试卷
    ExportPaper: domainName + 'PapersManage/PaperListOperate/ExportPaper',
    // 合并试卷
    MergePapers: domainName + 'PapersManage/PaperCompose/MergePapers',
    // 手动选题组卷
    ManualSelectionCompose: domainName + 'PapersManage/PaperCompose/ManualSelectionCompose',
    // 获取组卷策略
    GetStrategy: domainName + 'PapersManage/PaperCompose/GetStrategy',
    // 获取组卷策略出题范围
    GetStrategyQuestionRange: domainName + 'PapersManage/PaperCompose/GetStrategyQuestionRange',
    // 保存组卷策略出题范围
    SaveStrategyQuestionRange: domainName + 'PapersManage/PaperCompose/SaveStrategyQuestionRange',
    // 获取默认组卷策略模板题目库存
    GetQuestionStockForDefaultStrategy: domainName + 'PapersManage/PaperCompose/GetQuestionStockForDefaultStrategy',
    // 获取智能组卷题目库存
    GetQuestionNumForIntelligentStrategy: domainName + 'PapersManage/PaperCompose/GetQuestionNumForIntelligentStrategy',
    // 获取智能组卷知识点题目库存
    GetCategoryQuestionNumForIntelligentStrategy: domainName + 'PapersManage/PaperCompose/GetCategoryQuestionNumForIntelligentStrategy',
    // 策略组卷
    StrategyCompose: domainName + 'PapersManage/PaperCompose/StrategyCompose',
    // 修改组卷策略
    ModifyStrategy: domainName + 'PapersManage/PaperCompose/ModifyStrategy',
    // 准备创建活动安排所需数据
    GetServerTime: domainName + 'PapersManage/PaperCompose/GetServerTime',
    // 查询能够添加的题目列表
    QueryAddibleQuestionList: domainName + 'PapersManage/PaperCompose/QueryAddibleQuestionList',
    // 添加试卷结构
    AddPaperStructure: domainName + 'PapersManage/PaperCompose/AddPaperStructure',
    // 修改试卷结构
    ModifyPaperStructure: domainName + 'PapersManage/PaperCompose/ModifyPaperStructure',
    // 修改试卷结构备注
    ModifyPaperStructureComment: domainName + 'PapersManage/PaperCompose/ModifyPaperStructureComment',
    // 删除试卷结构
    RemovePaperStructure: domainName + 'PapersManage/PaperCompose/RemovePaperStructure',
    // 调整试卷结构顺序
    AdjustPaperStructureSequence: domainName + 'PapersManage/PaperCompose/AdjustPaperStructureSequence',
    // 调整试卷试题顺序
    AdjustPaperQuestionSequence: domainName + 'PapersManage/PaperCompose/AdjustPaperQuestionSequence',
    // 加题
    AddQuestions: domainName + 'PapersManage/PaperCompose/AddQuestions',
    // 换题
    ReplaceQuestion: domainName + 'PapersManage/PaperCompose/ReplaceQuestion',
    // 删题
    RemoveQuestion: domainName + 'PapersManage/PaperCompose/RemoveQuestion',
    // 修改题目分数
    ModifyQuestionScore: domainName + 'PapersManage/PaperCompose/ModifyQuestionScore',
    // 保存试卷属性
    SavePaperAttributes: domainName + 'PapersManage/PaperCompose/SavePaperAttributes',
    // 保存试卷（整卷覆盖保存，慎用）
    SavePaper: domainName + 'PapersManage/PaperCompose/SavePaper',
    // 提交试卷
    SubmitPaper: domainName + 'PapersManage/PaperCompose/SubmitPaper',
    // 分析试卷
    AnalysePaper: domainName + 'PapersManage/PaperCompose/AnalysePaper',
    // 复制试卷
    CopyPaper: domainName + 'PapersManage/PaperCompose/CopyPaper',
    // 保存试卷导出模板
    SavePaperExportTemplate: domainName + 'PapersManage/PaperExportTemplateManage/SavePaperExportTemplate',
    // 查询试卷导出模板样式列表
    QueryPaperExportTemplateStyle: domainName + 'PapersManage/PaperExportTemplateManage/QueryPaperExportTemplateStyle',
    // 查询试卷导出模板
    QueryPaperExportTemplateById: domainName + 'PapersManage/PaperExportTemplateManage/QueryPaperExportTemplateById',
    // 查询试卷导出模板列表
    QueryPaperExportTemplate: domainName + 'PapersManage/PaperExportTemplateManage/QueryPaperExportTemplate',
    // 删除试卷导出模板
    RemovePaperExportTemplate: domainName + 'PapersManage/PaperExportTemplateManage/RemovePaperExportTemplate',
    // 下载试卷导出模板
    DownloadPaperExportTemplate: domainName + 'PapersManage/PaperExportTemplateManage/DownloadPaperExportTemplate',
    // 获取试题配置
    GetQuestionConfig: domainName + 'SystemConfig/GetQuestionConfig',
    // 保存试题配置
    SaveQuestionConfig: domainName + 'SystemConfig/SaveQuestionConfig',
    // 获取试卷配置
    GetPaperConfig: domainName + 'SystemConfig/GetPaperConfig',
    // 保存试卷配置
    SavePaperConfig: domainName + 'SystemConfig/SavePaperConfig',
    //检测操作异常，列入黑名单
    studentJumpAnswerDiscover: domainName + 'TestActivity/studentJumpAnswerDiscover',
    //小程序详情页
    studentTestActivityDetails: domainName + 'TestActivity/studentTestActivityDetails',
    // 获取枚举类型的定义
    ReadEnumTypeDef: domainName + 'TestActivity/ReadEnumTypeDef',
    // 学生自测考试
    SelftTestActivity: domainName + 'TestActivity/SelftTestActivity',
    // 错题本重新做题
    WrongQuestionTestActivity: domainName + 'TestActivity/WrongQuestionTestActivity',
    // 查询测试活动类型列表
    QueryTestActivityTypes: domainName + 'TestActivity/QueryTestActivityTypes',
    // 保存测试活动类型
    SaveTestActivityType: domainName + 'TestActivity/SaveTestActivityType',
    // 通过条件查询测试活动安排列表
    QueryTestActivityArrangementListByConditions: domainName + 'TestActivity/QueryTestActivityArrangementListByConditions',
    // 删除测试活动安排
    RemoveTestActivityArrangements: domainName + 'TestActivity/RemoveTestActivityArrangements',
    // 准备创建活动安排所需数据
    CreateTestActivityArrangementPrepare: domainName + 'TestActivity/CreateTestActivityArrangementPrepare',
    // 为活动安排获取试卷列表
    GetPaperListForArrangement: domainName + 'TestActivity/GetPaperListForArrangement',
    // 根据用户输入的条件获取活动安排的信息
    GetArrangementsAndPaperInfor: domainName + 'TestActivity/GetArrangementsAndPaperInfor',
    // 创建(更新)活动安排实例入库
    CreateTestActivityArrangement: domainName + 'TestActivity/CreateTestActivityArrangement',
    // 101同步考试安排信息
    syncArrangementData: domainName + 'TestActivity/syncArrangementData',
    // 编辑活动安排实例
    EditTestActivityArrangement: domainName + 'TestActivity/EditTestActivityArrangement',
    // 根据活动类型，获取活动类型对应的活动安排列表
    GetTestActivityArrangementsByActivityTypeId: domainName + 'TestActivity/GetTestActivityArrangementsByActivityTypeId',
    // 开始参加考试
    StartAnswerPaper: domainName + 'TestActivity/StartAnswerPaper',
    // 开始参加考试(小程序)
    StartAnswerPaperByMini: domainName + 'TestActivity/StartAnswerPaperByMini',
    //开始参加考试(人脸验证)
    StartAnswerPaperWithPhoto: domainName + 'TestActivity/StartAnswerPaperWithPhoto',
    //开始参加考试(人脸验证小程序)
    StartAnswerPaperWithPhotoByMini: domainName + 'TestActivity/StartAnswerPaperWithPhotoByMini',
    //查询考试报告
    studentTestActivityReport: domainName + 'TestActivity/studentTestActivityReport',
    //查询考试时间
    getAnswerPaperTime: domainName + 'TestActivity/getAnswerPaperTime',
    // 系统判断题目对错
    CorrectQuestionBySystem: domainName + 'TestActivity/CorrectQuestionBySystem',
    // 提交考试结果
    SubmitAnswerPaper: domainName + 'TestActivity/SubmitAnswerPaper',
    // 获取活动类型定义
    GetTestActivityTypes: domainName + 'TestActivity/GetTestActivityTypes',
    // 查看答卷详情
    QueryAnswerPaperDetails: domainName + 'TestActivity/QueryAnswerPaperDetails',
    // 查看答题情况
    QueryAnswerPaperQuestion: domainName + 'TestActivity/QueryAnswerPaperQuestion',
    // 通过条件查询错题列表
    QueryWrongQuestionListByConditions: domainName + 'TestActivity/QueryWrongQuestionListByConditions',
    // 移除错题
    RemoveWrongQuestions: domainName + 'TestActivity/RemoveWrongQuestions',
    // 获取活动安排评阅统计信息
    QueryArrangementStateList: domainName + 'TestActivity/QueryArrangementStateList',
    // 获取活动安排评阅学生列表信息
    QueryArrangementStudentList: domainName + 'TestActivity/QueryArrangementStudentList',
    // 提交教师评阅内容
    SubmitJudgement: domainName + 'TestActivity/SubmitJudgement',
    // 测试活动监控统计
    QueryArrangementStatistics: domainName + 'TestActivity/QueryArrangementStatistics',
    // 批量修改活动结束时间
    UpdateTestActivityArrangementsEndtime: domainName + 'TestActivity/UpdateTestActivityArrangementsEndtime',
    // 获取活动安排学生列表信息
    QueryArrangementStatisticsStudentList: domainName + 'TestActivity/QueryArrangementStatisticsStudentList',
    // 删除试卷（活动监控中用）
    DeleteStudentAnswerPaperRecord: domainName + 'TestActivity/DeleteStudentAnswerPaperRecord',
    // 得到学生活动类型列表和未完成内容数量
    QueryActivityTypeListByStudentIdAndCourseCode: domainName + 'TestActivity/QueryActivityTypeListByStudentIdAndCourseCode',
    // 根据活动类型和课程code得到学生活动安排内容
    QueryStudentArrangementListByTypeIdAndCoursecode: domainName + 'TestActivity/QueryStudentArrangementListByTypeIdAndCoursecode',
    // 根据活动类型和课程code得到管理活动安排内容
    QueryArrangementListByCourseCode: domainName + 'TestActivity/QueryArrangementListByCourseCode',
    // 考试活动添加对应的学生
    addStduent2ArrangmentByOrg: domainName + 'TestActivity/addStduent2ArrangmentByOrg',
    // 考试活动添加对应的学生
    changeStudent2ArrangementByUser: domainName + 'TestActivity/changeStudent2ArrangementByUser',
    // 查找范围内外学生列表
    queryStudentList4Range: domainName + 'TestActivity/queryStudentList4Range',
    // 考试活动是否可以添加学生范围
    checkStudentRange: domainName + 'TestActivity/checkStudentRange',
    // 批量创建或修改考试活动
    createMultiTestActivityArrangement: domainName + 'TestActivity/createMultiTestActivityArrangement',
    // 临时保存作答信息
    TempSaveAnswerPaper: domainName + 'TestActivity/TempSaveAnswerPaper',
    // 获取转储设置前的参数信息
    QueryDumpDataInfoBeforeSetting: domainName + 'TestActivity/QueryDumpDataInfoBeforeSetting',
    // 设置转储信息
    SetDumpDataInfo: domainName + 'TestActivity/SetDumpDataInfo',
    // 查询转储信息
    QueryDumpDataInfo: domainName + 'TestActivity/QueryDumpDataInfo',
    // 查询转储详细信息
    QueryDumpDataDetailInfo: domainName + 'TestActivity/QueryDumpDataDetailInfo',
    // 开始转储
    StartDumpData: domainName + 'TestActivity/StartDumpData',
    // 通过条件查询错题列表
    QueryWrongQuestionListByConditions: domainName + 'TestActivity/QueryWrongQuestionListByConditions',
    // 通过条件查询错题列表
    QueryOtherQuestionFromOneFact: domainName + 'TestActivity/QueryOtherQuestionFromOneFact',
    // 打开考试单页确认
    SetSinglePageDelay: domainName + 'TestActivity/SetSinglePageDelay',
    // 获取题目自定义属性列表
    QuestionExt: domainName + 'ExtDataDefinition/QuestionExt',
    // 获取试卷自定义属性列表
    PaperExt: domainName + 'ExtDataDefinition/PaperExt',
    // 获取参与组卷的试题的扩展属性列表
    QuestionExt4CreatePaper: domainName + 'ExtDataDefinition/QuestionExt4CreatePaper',
    // 获取当前登录用户的功能权限设置
    UserFPSettings: domainName + 'Public/UserFPSettings',
    //获取学生信息
    getStudentSimpleInformationByMini: domainName + 'Public/getStudentSimpleInformationByMini',
    // 上载图片
    UploadImage: domainName + 'Public/UploadImage',
    // 上载图片(小程序)
    UploadImageByClient: domainName + 'Public/UploadImageByClient',
    // 上载附件
    UploadContent: domainName + 'Public/UploadContent',
    // 在服务端下载指定url的图片(是其他网站的..)
    DownloadImage: domainName + 'Public/DownloadImage',
    // 成绩发送数量
    SendAchievementNum: domainName + 'Public/SendAchievementNum',
    // 成绩核算
    CheckAchievement: domainName + 'Public/CheckAchievement',
    // 人脸比对
    faceCompare: domainName + 'Public/faceCompare',
    //重置作答记录开始时间
    ResetAnswerPaperStartTime: domainName + 'Public/ResetAnswerPaperStartTime',
    //上传考试拍摄照片
    UploadTestPhoto: domainName + 'Public/UploadTestPhoto',
    //判断是否需要人脸识别
    getNeedPhotoStatus: domainName + 'Public/getNeedPhotoStatus',
    // 通过条件查询纠错类型列表
    queryCorrectionTypeByCondition: domainName + 'TestActivity/queryCorrectionTypeByCondition',
    // 创建或修改纠错类型
    CreateCorrectionType: domainName + 'Correction/CreateCorrectionType',
    // 删除改纠错类型
    RemoveCorrectionType: domainName + 'Correction/RemoveCorrectionType',
    // 添加或修改试题纠错
    CreateCorrection: domainName + 'Correction/CreateCorrection',
    // 查询纠错具体信息
    QueryCorrectionInfo: domainName + 'Correction/QueryCorrectionInfo',
    // 通过条件查询纠错列表
    queryCorrectionListByCondition: domainName + 'Correction/queryCorrectionListByCondition',
    // 查询相关的租户
    GetRelateTenant: domainName + 'Correction/GetRelateTenant',
    // 导入试题
    ImportQuestions: domainName + 'Dts/ImportQuestions',
    // 导入课程
    ImportQuestionCategoryItems: domainName + 'Dts/ImportQuestionCategoryItems',
    // 导入组织结构
    ImportOrganizations: domainName + 'Dts/ImportOrganizations',
    // 导入人员信息
    ImportUserInfos: domainName + 'Dts/ImportUserInfos',
    // 导入试题新方法
    ImportQuestionsNew: domainName + 'Dts/ImportQuestionsNew',
    //添加导入文件
    UploadImportFile: domainName + 'Dts/UploadImportFile',
    //查询导入文件信息
    QueryQuestionBatchImportList: domainName + 'Dts/QueryQuestionBatchImportList',
    // 保存组织机构
    SaveOrganization: domainName + 'OrganizationManage/SaveOrganization',
    // 查询组织机构类型
    QueryOrganizationLevelTypes: domainName + 'OrganizationManage/QueryOrganizationLevelTypes',
    // 查询角色列表
    GetRoles: domainName + 'OrganizationManage/GetRoles',
    // 查询组织机构（单条、编辑用）
    QueryOrganizationByCode: domainName + 'OrganizationManage/QueryOrganizationByCode',
    // 查询组织机构树
    QueryOrganizationByName: domainName + 'OrganizationManage/QueryOrganizationByName',
    // 获取组织机构子节点列表
    QueryChildOrganization: domainName + 'OrganizationManage/QueryChildOrganization',
    // 操作组织机构
    OperateOrganization: domainName + 'OrganizationManage/OperateOrganization',
    // 删除组织机构
    RemoveOrganization: domainName + 'OrganizationManage/RemoveOrganization',
    // 导出组织机构(有导出编码时，按导出编码导出；无导出编码时按类型、编码、名称和状态查询后导出)
    ExportOrganization: domainName + 'OrganizationManage/ExportOrganization',
    // 保存人员信息
    SaveUserInfo: domainName + 'UserInfoManage/SaveUserInfo',
    // 查询用户信息（单条、编辑用）
    QueryUserInfoById: domainName + 'UserInfoManage/QueryUserInfoById',
    // 获取组织人员列表
    QueryUserInfoByOrganizationCode: domainName + 'UserInfoManage/QueryUserInfoByOrganizationCode',
    // 操作用户信息
    OperateUserInfo: domainName + 'UserInfoManage/OperateUserInfo',
    // 删除用户信息
    RemoveUserInfo: domainName + 'UserInfoManage/RemoveUserInfo',
    // 修改用户组织机构(有修改ID时，按修改ID导出；无修改ID时按组织类型、组织编码、用户名称和用户状态查询后修改)
    ChangeUserOrganizationCode: domainName + 'UserInfoManage/ChangeUserOrganizationCode',
    // 导出用户信息(有导出ID时，按导出ID导出；无导出ID时按组织类型、组织编码、用户名称和用户状态查询后导出)
    ExportUserInfo: domainName + 'UserInfoManage/ExportUserInfo',
    // 查询日志
    QueryLogsByConditions: domainName + 'LogManage/QueryLogsByConditions',
    // 保存权限组
    SavePrivilegeGroup: domainName + 'PrivilegeManage/SavePrivilegeGroup',
    // 查询权限组（单条、编辑用）
    QueryPrivilegeGroupById: domainName + 'PrivilegeManage/QueryPrivilegeGroupById',
    // 查询权限项
    QueryFunctionPointsByPGId: domainName + 'PrivilegeManage/QueryFunctionPointsByPGId',
    // 查询权限组列表
    QueryPrivilegeGroups: domainName + 'PrivilegeManage/QueryPrivilegeGroups',
    // 操作权限组
    RemovePrivilegeGroup: domainName + 'PrivilegeManage/RemovePrivilegeGroup',
    // 缓存IP地址库信息
    InitIpInfo: domainName + 'memorycache/InitIpInfo',
    // 查询安排下试卷试题正确率
    QueryQuestionCorrectRate: domainName + 'Statistics/QueryQuestionCorrectRate',
    // 查询每道试题正确率详情
    QueryQuestionAnswerStudentList: domainName + 'Statistics/QueryQuestionAnswerStudentList',
    // 查询安排下试卷试题正确率
    QueryQuestionHistoryCorrectRate: domainName + 'Statistics/QueryQuestionHistoryCorrectRate',
    // 查询安排下高频疑点
    QueryHighErrorCategoryItem: domainName + 'Statistics/QueryHighErrorCategoryItem',
    // 计算学年学生知识点学习统计信息
    calStudentCategoryRate: domainName + 'Statistics/calStudentCategoryRate',
    // 查询班级学生知识点学习统计信息
    QueryClassCategoryRate: domainName + 'Statistics/QueryClassCategoryRate',
    // 查询单个学生多学科知识点学习统计信息
    QueryStudentCategoryRate: domainName + 'Statistics/QueryStudentCategoryRate',
    // 查询学生某科（版本）下正确率
    queryStudentCategoryRateDetail: domainName + 'Statistics/queryStudentCategoryRateDetail',
    //查询各学科试题数量
    getCategoryQuestionAmount: domainName + 'Statistics/getCategoryQuestionAmount',
    //查询学科下试题类型试题数量
    getCategoryItemQuestionTypeAmount: domainName + 'Statistics/getCategoryItemQuestionTypeAmount',
    //查询学科下试题类型试题数量
    getCategoryItemQuestionDifficultyAmount: domainName + 'Statistics/getCategoryItemQuestionDifficultyAmount',
    //查询学科下知识点试题数量
    getCategoryItemQuestionAmount: domainName + 'Statistics/getCategoryItemQuestionAmount',
    //导出学科统计信息
    ExportQuestionAmountInfo: domainName + 'Statistics/ExportQuestionAmountInfo',
    //导出学科下的题型统计信息
    ExportQuestionTypeAmountInfo: domainName + 'Statistics/ExportQuestionTypeAmountInfo',
    //导出学科下的知识点统计信息
    ExportQuestionCategoryItemAmountInfo: domainName + 'Statistics/ExportQuestionCategoryItemAmountInfo',
    //导出学科下的难度统计信息
    ExportQuestionDifficultyAmountInfo: domainName + 'Statistics/ExportQuestionDifficultyAmountInfo',
}

export default api
