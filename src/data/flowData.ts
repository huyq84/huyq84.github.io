// 项目管理流程图完整数据结构
export interface FlowNode {
  id: string;
  label: string;
  description: string; // 节点下小字，若无则与label同名
  progress: number;    // 0-100
  formFields: Array<{ name: string; label: string; type: string }>;
  next?: string[];     // 下一个节点 id
}

// 随机生成进度辅助函数
function randomProgress() {
  return Math.floor(Math.random() * 101);
}

// 一级/二级节点id
const NO_PROGRESS_NODE_IDS = [
  'root',
  'bidding',
  'planning',
  'preparation',
  'implementation',
  'completionHandover',
  'afterSales',
];

export const flowNodes: FlowNode[] = [
  // 根节点
  { id: 'root', label: '项目管理流程图', description: '项目管理流程图', progress: 0, formFields: [{ name: 'root', label: '项目管理流程图', type: 'input' }], next: ['bidding', 'planning', 'preparation', 'implementation', 'handoverMain', 'afterSales'] },

  // 项目投标链
  { id: 'bidding', label: '项目投标', description: '项目投标', progress: 0, formFields: [{ name: 'bidding', label: '项目投标', type: 'input' }], next: ['siteSurvey'] },
  { id: 'siteSurvey', label: '现场踏勘', description: '现场勘察记录表', progress: 0, formFields: [
    { name: '编号', label: '编号', type: 'input' },
    { name: '序号', label: '序号', type: 'input' },
    { name: '工程名称', label: '工程名称', type: 'input' },
    { name: '建设单位', label: '建设单位', type: 'input' },
    { name: '施工单位', label: '施工单位', type: 'input' },
    { name: '图纸依据', label: '图纸依据', type: 'input' },
    { name: '工程地点', label: '工程地点', type: 'input' },
    { name: '建设规模', label: '建设规模', type: 'input' },
    { name: '工程项目', label: '工程项目', type: 'textarea' },
    { name: '平面示意图', label: '平面示意图', type: 'upload' },
    { name: '勘察内容', label: '勘察内容', type: 'textarea' },
    { name: '签名', label: '签名', type: 'input' },
    { name: '日期', label: '日期', type: 'date' },
  ], next: ['bidDocQA'] },
  { id: 'bidDocQA', label: '招标文件答疑', description: '招标答疑问题汇总表', progress: 0, formFields: [{ name: 'bidDocQA', label: '招标答疑问题汇总', type: 'textarea' }], next: ['techBidCompile'] },
  { id: 'techBidCompile', label: '技术标编制', description: '技术标', progress: 0, formFields: [{ name: 'techBid', label: '技术标', type: 'textarea' }], next: ['pmBidPresentation'] },
  { id: 'pmBidPresentation', label: '项目经理述标', description: '述标PPT', progress: 0, formFields: [{ name: 'pmBidPresentation', label: '述标PPT', type: 'textarea' }], next: ['bidAnalysis'] },
  { id: 'bidAnalysis', label: '投标成本分析', description: '投标成本分析汇总表', progress: 0, formFields: [
    { name: '项目名称', label: '项目名称', type: 'input' },
    { name: '投标编号', label: '投标编号', type: 'input' },
    { name: '投标日期', label: '投标日期', type: 'date' },
    { name: '人工费', label: '人工费', type: 'input' },
    { name: '材料费', label: '材料费', type: 'input' },
    { name: '机械费', label: '机械费', type: 'input' },
    { name: '管理费', label: '管理费', type: 'input' },
    { name: '利润', label: '利润', type: 'input' },
    { name: '合计', label: '合计', type: 'input' },
    { name: '编制人', label: '编制人', type: 'input' },
    { name: '审核人', label: '审核人', type: 'input' },
    { name: '备注', label: '备注', type: 'textarea' },
  ], next: [] },

  // 项目策划分支
  { id: 'planning', label: '项目策划', description: '项目策划', progress: 0, formFields: [{ name: 'planning', label: '项目策划', type: 'input' }], next: ['orgPlanning', 'constructionPlanning', 'businessPlanning', 'fundPlanning'] },

  // 项目组织策划链
  { id: 'orgPlanning', label: '项目组织策划', description: '项目组织策划', progress: 0, formFields: [{ name: 'orgPlanning', label: '项目组织策划', type: 'input' }], next: ['orgStructure'] },
  { id: 'orgStructure', label: '项目组织架构', description: '组织架构图', progress: 0, formFields: [{ name: 'orgStructure', label: '组织架构图', type: 'textarea' }], next: ['pmDivision'] },
  { id: 'pmDivision', label: '项目岗位分工', description: '岗位职责', progress: 0, formFields: [{ name: 'pmDivision', label: '岗位职责', type: 'textarea' }], next: [] },

  // 施工策划链（修正：施工策划→制定管理目标、计划编制为平级）
  { id: 'constructionPlanning', label: '施工策划', description: '施工策划', progress: 0, formFields: [{ name: 'constructionPlanning', label: '施工策划', type: 'input' }], next: ['mgmtTarget', 'planCompile'] },
  { id: 'mgmtTarget', label: '制定管理目标', description: '管理目标', progress: 0, formFields: [{ name: 'mgmtTarget', label: '管理目标', type: 'textarea' }], next: ['targetDetail'] },
  { id: 'targetDetail', label: '进度、安全、质量等管理目标', description: '管理目标', progress: 0, formFields: [{ name: 'targetDetail', label: '管理目标', type: 'textarea' }], next: [] },
  { id: 'planCompile', label: '计划编制', description: '计划编制', progress: 0, formFields: [{ name: 'planCompile', label: '计划编制', type: 'textarea' }], next: ['progressPlan', 'procurementPlan', 'laborPlan', 'supplyPlan', 'subcontractMgmt', 'splitPlan', 'materialPlan', 'deepDesign'] },
  { id: 'progressPlan', label: '总进度计划', description: '总进度计划/图', progress: 0, formFields: [{ name: 'progressPlan', label: '总进度计划/图', type: 'textarea' }], next: [] },
  { id: 'procurementPlan', label: '采购计划', description: '采购计划表', progress: 0, formFields: [{ name: 'procurementPlan', label: '采购计划表', type: 'textarea' }], next: [] },
  { id: 'laborPlan', label: '劳务承包模式', description: '表格', progress: 0, formFields: [{ name: 'laborPlan', label: '表格', type: 'textarea' }], next: [] },
  { id: 'supplyPlan', label: '甲供材计划', description: '甲供材计划表', progress: 0, formFields: [{ name: 'supplyPlan', label: '甲供材计划表', type: 'textarea' }], next: [] },
  { id: 'subcontractMgmt', label: '甲分包管理', description: '甲分包管理', progress: 0, formFields: [{ name: 'subcontractMgmt', label: '甲分包管理', type: 'textarea' }], next: [] },
  { id: 'splitPlan', label: '分包计划', description: '分包计划表', progress: 0, formFields: [{ name: 'splitPlan', label: '分包计划表', type: 'textarea' }], next: [] },
  { id: 'materialPlan', label: '材料封样计划', description: '材料封样计划表', progress: 0, formFields: [{ name: 'materialPlan', label: '材料封样计划表', type: 'textarea' }], next: [] },
  { id: 'deepDesign', label: '深化设计', description: '深化设计工作计划表', progress: 0, formFields: [{ name: 'deepDesign', label: '深化设计工作计划表', type: 'textarea' }], next: [] },

  // 经营策划分支
  { id: 'businessPlanning', label: '经营策划', description: '经营策划', progress: 0, formFields: [{ name: 'businessPlanning', label: '经营策划', type: 'input' }], next: ['businessIndex', 'businessAnalysis'] },
  { id: 'businessIndex', label: '制定经营指标', description: '制定经营指标', progress: 0, formFields: [{ name: 'businessIndex', label: '制定经营指标', type: 'textarea' }], next: ['profitAnalysis'] },
  { id: 'profitAnalysis', label: '利润率、回款率、现金流…', description: '各项指标', progress: 0, formFields: [{ name: 'profitAnalysis', label: '各项指标', type: 'textarea' }], next: [] },
  { id: 'businessAnalysis', label: '经营分析', description: '经营分析', progress: 0, formFields: [{ name: 'businessAnalysis', label: '经营分析', type: 'textarea' }], next: ['contractRisk'] },
  { id: 'contractRisk', label: '合同风险分析及应对措施', description: '文档', progress: 0, formFields: [{ name: 'contractRisk', label: '文档', type: 'textarea' }], next: ['businessNegotiation'] },
  { id: 'businessNegotiation', label: '商务交底', description: '交底记录', progress: 0, formFields: [{ name: 'businessNegotiation', label: '交底记录', type: 'textarea' }], next: [] },

  // 资金策划分支
  { id: 'fundPlanning', label: '资金策划', description: '资金策划', progress: 0, formFields: [{ name: 'fundPlanning', label: '资金策划', type: 'input' }], next: ['fundBalancePlan'] },
  { id: 'fundBalancePlan', label: '项目资金平衡计划', description: '项目资金平衡计划表', progress: 0, formFields: [{ name: 'fundBalancePlan', label: '项目资金平衡计划表', type: 'textarea' }], next: [] },

  // 项目准备分支
  { id: 'preparation', label: '项目准备', description: '项目准备', progress: 0, formFields: [{ name: 'preparation', label: '项目准备', type: 'input' }], next: ['startWork', 'techDocCompile', 'handover', 'temporary', 'materialSample', 'subcontractSign'] },
  { id: 'startWork', label: '开工手续', description: '申办、盖章、管理', progress: 0, formFields: [{ name: 'startWork', label: '申办、盖章、管理', type: 'textarea' }], next: [] },
  { id: 'techDocCompile', label: '技术文件编制', description: '技术文件编制', progress: 0, formFields: [{ name: 'techDocCompile', label: '技术文件编制', type: 'textarea' }], next: ['bidConstructionOrgDesign'] },
  { id: 'bidConstructionOrgDesign', label: '投标施工组织设计调整', description: '施工组织设计', progress: 0, formFields: [{ name: 'bidConstructionOrgDesign', label: '施工组织设计', type: 'textarea' }], next: ['planCompileSolution'] },
  { id: 'planCompileSolution', label: '编制方案', description: '专项方案', progress: 0, formFields: [{ name: 'planCompileSolution', label: '专项方案', type: 'textarea' }], next: ['safetyTechDisclosure'] },
  { id: 'safetyTechDisclosure', label: '安全技术交底', description: '交底记录', progress: 0, formFields: [{ name: 'safetyTechDisclosure', label: '交底记录', type: 'textarea' }], next: [] },
  { id: 'handover', label: '界面移交', description: '界面移交记录表', progress: 0, formFields: [{ name: 'handover', label: '界面移交记录表', type: 'textarea' }], next: [] },
  { id: 'temporary', label: '临水、临电、临时设施', description: '验收记录表', progress: 0, formFields: [{ name: 'temporary', label: '验收记录表', type: 'textarea' }], next: [] },
  { id: 'materialSample', label: '材料封样', description: '材料封样记录表', progress: 0, formFields: [{ name: 'materialSample', label: '材料封样记录表', type: 'textarea' }], next: [] },
  { id: 'subcontractSign', label: '分包合同签订', description: '分包合同', progress: 0, formFields: [{ name: 'subcontractSign', label: '分包合同', type: 'textarea' }], next: [] },

  // 项目实施分支
  { id: 'implementation', label: '项目实施', description: '项目实施', progress: 0, formFields: [{ name: 'implementation', label: '项目实施', type: 'input' }], next: ['survey', 'structureDemolition', 'secondaryStructure', 'meInstall', 'decorationBase', 'decorationSurface', 'meFinalInstall', 'equipmentDebug', 'cleaning'] },
  { id: 'survey', label: '测量放线', description: '测量放线图', progress: 0, formFields: [{ name: 'survey', label: '测量放线图', type: 'textarea' }], next: [] },
  { id: 'structureDemolition', label: '结构拆除改造', description: '结构拆除改造', progress: 0, formFields: [{ name: 'structureDemolition', label: '结构拆除改造', type: 'textarea' }], next: [] },
  { id: 'secondaryStructure', label: '二次结构砌筑', description: '二次结构砌筑', progress: 0, formFields: [{ name: 'secondaryStructure', label: '二次结构砌筑', type: 'textarea' }], next: [] },
  { id: 'meInstall', label: '机电预埋', description: '机电预埋', progress: 0, formFields: [{ name: 'meInstall', label: '机电预埋', type: 'textarea' }], next: [] },
  { id: 'decorationBase', label: '装饰基层', description: '装饰基层', progress: 0, formFields: [{ name: 'decorationBase', label: '装饰基层', type: 'textarea' }], next: [] },
  { id: 'decorationSurface', label: '装饰面层', description: '装饰面层', progress: 0, formFields: [{ name: 'decorationSurface', label: '装饰面层', type: 'textarea' }], next: [] },
  { id: 'meFinalInstall', label: '机电末端安装', description: '机电末端安装', progress: 0, formFields: [{ name: 'meFinalInstall', label: '机电末端安装', type: 'textarea' }], next: [] },
  { id: 'equipmentDebug', label: '设备调试', description: '设备调试', progress: 0, formFields: [{ name: 'equipmentDebug', label: '设备调试', type: 'textarea' }], next: [] },
  { id: 'cleaning', label: '开荒保洁', description: '开荒保洁', progress: 0, formFields: [{ name: 'cleaning', label: '开荒保洁', type: 'textarea' }], next: [] },

  // 竣工移交分支（一级节点，id: handoverMain）
  { id: 'handoverMain', label: '竣工移交', description: '竣工移交', progress: 0, formFields: [{ name: 'handoverMain', label: '竣工移交', type: 'input' }], next: ['completionAcceptance', 'handoverOwner', 'finalSettlement'] },
  { id: 'completionAcceptance', label: '竣工验收', description: '竣工验收', progress: 0, formFields: [{ name: 'completionAcceptance', label: '竣工验收', type: 'textarea' }], next: [] },
  { id: 'handoverOwner', label: '移交小业主', description: '移交小业主', progress: 0, formFields: [{ name: 'handoverOwner', label: '移交小业主', type: 'textarea' }], next: [] },
  { id: 'finalSettlement', label: '竣工结算', description: '竣工结算', progress: 0, formFields: [{ name: 'finalSettlement', label: '竣工结算', type: 'textarea' }], next: [] },

  // 售后维修分支
  { id: 'afterSales', label: '售后维修', description: '售后服务', progress: 0, formFields: [{ name: 'afterSales', label: '售后服务', type: 'textarea' }], next: ['afterService', 'warrantyCollection'] },
  { id: 'afterService', label: '售后服务', description: '售后服务记录表', progress: 0, formFields: [
    { name: '服务内容', label: '服务内容', type: 'textarea' },
    { name: '服务时间', label: '服务时间', type: 'date' },
    { name: '客户反馈', label: '客户反馈', type: 'textarea' },
    { name: '质保金金额', label: '质保金金额', type: 'input' },
    { name: '收取时间', label: '收取时间', type: 'date' },
    { name: '负责人', label: '负责人', type: 'input' },
  ], next: [] },
  { id: 'warrantyCollection', label: '质保金收取', description: '质保金收取', progress: 0, formFields: [{ name: 'warrantyCollection', label: '质保金收取', type: 'textarea' }], next: [] },
].map(node => ({
  ...node,
  progress: NO_PROGRESS_NODE_IDS.includes(node.id) ? 0 : randomProgress(),
})); 