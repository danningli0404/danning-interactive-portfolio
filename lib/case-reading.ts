import type { Pair } from './portfolio';
export type ReadingSlug='tacchat'|'sense-together'|'vitalride'|'purelink';
export type ReadingSection={id:string;className:string;title:Pair;nav?:boolean};
type ReadingCase={problem:Pair;role:Pair;solution:Pair;evidence:Pair;sections:ReadingSection[]};
export const caseReading:Record<ReadingSlug,ReadingCase>={
 tacchat:{
  problem:{zh:'盲人和低视力用户难以通过语言理解、创作与交流复杂图形。',en:'Blind and low-vision users face barriers to understanding, creating and sharing complex graphics through words alone.'},
  role:{zh:'团队项目，论文第二作者。参与系统流程设计，负责实验设计、用户研究、数据分析与论文写作。',en:'Team project and second author. Contributed to the system workflow; responsible for experimental design, user research, data analysis and paper writing.'},
  solution:{zh:'将 3D 打印笔绘图、数字化转换、触觉显示器修改与图形分享连接成服务流程。',en:'A service workflow connecting 3D-pen drawing, digitization, editing on a tactile display and sharing.'},
  evidence:{zh:'论文发表于 CHI EA ’26；系统在联合国日内瓦办事处展览中展出。实验结果见下方对应章节。',en:'Published at CHI EA ’26; the system was exhibited at the United Nations Office at Geneva. See the experiments section for reported results.'},
  sections:[
   {id:'tac-context',className:'faithful-row tac-research',title:{zh:'背景与用户研究',en:'Context and user research'}},
   {id:'tac-system',className:'tactile-workflow-original',title:{zh:'系统流程与使用体验',en:'System workflow and experience'}},
   {id:'tac-results',className:'tac-results',title:{zh:'实验与用户反馈',en:'Experiments and user feedback'}},
   {id:'tac-exhibition',className:'tac-exhibition',title:{zh:'展览与传播',en:'Exhibition and communication'}},
  ]
 },
 'sense-together':{
  problem:{zh:'听障与视障观众在音乐节现场面临信息获取、参与体验与观演安全方面的障碍。',en:'Deaf, hard-of-hearing and blind attendees face barriers to information, participation and safety at music festivals.'},
  role:{zh:'个人项目，开展用户研究，完成服务设计、产品设计与应用界面设计。',en:'Individual project covering user research, service design, product concepts and app interfaces.'},
  solution:{zh:'以实时字幕 AR 眼镜、振动手环、专用观演区域与配套 App，回应不同感官需求。',en:'AR captions, a haptic wristband, a dedicated viewing area and a companion app address different access needs.'},
  evidence:{zh:'形成设备、App 与服务系统方案，并收集用户测试反馈，评估字幕参与体验与观演安全感。',en:'Developed device, app and service concepts, with user feedback on live captions, participation and perceived safety.'},
  sections:[
   {id:'sense-research',className:'faithful-row sense-research',title:{zh:'现场观察与访谈',en:'Field observations and interviews'}},
   {id:'sense-service',className:'sense-service',title:{zh:'服务系统',en:'Service system'}},
   {id:'sense-design',className:'sense-final',title:{zh:'产品与应用界面',en:'Products and app interfaces'}},
   {id:'sense-feedback',className:'sense-validation',title:{zh:'用户反馈',en:'User feedback'}},
  ]
 },
 vitalride:{
  problem:{zh:'高温工作中的外卖员常依赖主观感受判断身体状态，健康风险难以及时察觉。',en:'Delivery riders working in heat often rely on how they feel, making changes in their physical condition difficult to notice.'},
  role:{zh:'个人项目，完成产品设计、UI 设计与人机交互原型探索。',en:'Individual project covering product design, UI design and human–computer interaction prototyping.'},
  solution:{zh:'组合背心、头盔、姿态与生理数据传感器，以及查看读数和设备状态的 App。',en:'A vest, helmet, motion and physiological sensors, and an app for readings and device status.'},
  evidence:{zh:'展示姿态、心率与温度传感器的原型测试、状态反馈，以及骑手使用场景。',en:'Prototype tests show posture, heart-rate and temperature readings, status feedback and an intended rider-use scenario.'},
  sections:[
   {id:'vital-research',className:'vital-problem',title:{zh:'调研与设计问题',en:'Research and design problem'}},
   {id:'vital-design',className:'vital-design',title:{zh:'穿戴设备与 App',en:'Wearables and app'}},
   {id:'vital-prototype',className:'vital-tests',title:{zh:'传感器与原型测试',en:'Sensors and prototype tests'}},
   {id:'vital-scenario',className:'vital-story',title:{zh:'使用场景',en:'Use scenario'}},
  ]
 },
 purelink:{
  problem:{zh:'居民的水质问题涉及水厂、物业与政府等多方，单一产品难以覆盖沟通和责任边界。',en:'Residents’ water-quality concerns involve utilities, property managers and government, alongside communication and responsibility gaps.'},
  role:{zh:'个人项目，开展访谈、焦点小组与文化探针，完成产品、App 和服务系统设计。',en:'Individual project using interviews, focus groups and cultural probes to develop product, app and service-system designs.'},
  solution:{zh:'将多层过滤装置、水质检测原型与多方信息流结合，明确采购、安装和反馈流程。',en:'Layered filtration, water-quality sensing and shared information flows connect procurement, installation and feedback.'},
  evidence:{zh:'制作 Arduino 电子原型，并比较净化前后的水质检测读数。',en:'An Arduino electronics prototype and a comparison of indicator readings before and after treatment.'},
  sections:[
   {id:'pure-context',className:'pure-problem',title:{zh:'问题背景',en:'Problem context'}},
   {id:'pure-research',className:'pure-research',nav:false,title:{zh:'利益相关者与共创',en:'Stakeholders and co-design'}},
   {id:'pure-probes',className:'pure-probe',nav:false,title:{zh:'文化探针',en:'Cultural probes'}},
   {id:'pure-system',className:'pure-system',title:{zh:'协作与责任',en:'Coordination and responsibilities'}},
   {id:'pure-app',className:'pure-interfaces',title:{zh:'产品与 App',en:'Product and app'}},
   {id:'pure-filtration',className:'pure-filtration',title:{zh:'过滤结构与材料',en:'Filtration and materials'}},
   {id:'pure-electronics',className:'pure-electronics',title:{zh:'电子原型',en:'Electronics prototype'}},
   {id:'pure-results',className:'pure-test',title:{zh:'原型测试结果',en:'Prototype-test results'}},
  ]
 }
};
