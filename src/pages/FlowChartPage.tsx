import React, { useState, useMemo, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap, type Node, type Edge, type NodeMouseHandler, Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import 'reactflow/dist/style.css';
import type { FlowNode } from '../data/flowData';
import { flowNodes } from '../data/flowData';
import { Modal, Form, Input, Button, DatePicker, Upload, ConfigProvider, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
const { Title } = Typography;

// 递归分层布局参数
const NODE_WIDTH = 160;
const H_GAP = 32;
const V_GAP = 48;
const LAYER_HEIGHT = V_GAP + 112; // 112为节点高度+进度条冗余，V_GAP为可调间距
const CENTER_X = 700;
const START_Y = 100;

// 构建id到节点的映射
const nodeMap: Record<string, FlowNode> = {};
flowNodes.forEach(n => { nodeMap[n.id] = n; });

// 一级节点顺序调整：投标、策划、准备、实施、竣工移交、售后
const firstLayerOrder = ['bidding', 'planning', 'preparation', 'implementation', 'handoverMain', 'afterSales'];

// 不弹窗的节点id列表
const NO_FORM_NODE_IDS = [
  'root', // 项目管理流程图
  'bidding', // 项目投标
  'planning', // 项目策划
  'preparation', // 项目准备
  'implementation', // 项目实施
  'completionHandover', // 竣工移交
  'afterSales', // 售后维修
];

// 一级/二级节点id
const NO_PROGRESS_NODE_IDS = [
  'root',
  'bidding',
  'planning',
  'preparation',
  'implementation',
  'completionHandover',
  'afterSales',
  'handoverMain',
];

// 递归生成分层节点和连线
function buildLayout(rootId: string) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const layerMap: Record<number, string[]> = {};
  const posMap: Record<string, { x: number, y: number, layer: number }> = {};

  function dfs(id: string, layer: number) {
    if (!layerMap[layer]) layerMap[layer] = [];
    if (!layerMap[layer].includes(id)) layerMap[layer].push(id);
    posMap[id] = { x: 0, y: 0, layer };
    const node = nodeMap[id];
    if (node?.next) node.next.forEach(childId => dfs(childId, layer + 1));
  }
  dfs(rootId, 0);

  // 计算每层节点的横坐标
  Object.entries(layerMap).forEach(([layerStr, ids]) => {
    const layer = Number(layerStr);
    let idsOrdered = ids;
    if (layer === 1 && rootId === 'root') {
      // 一级节点按 firstLayerOrder 排列，且只渲染这6个节点
      idsOrdered = firstLayerOrder.filter(id => ids.includes(id));
    }
    const totalWidth = idsOrdered.length * NODE_WIDTH + (idsOrdered.length - 1) * H_GAP;
    const startX = CENTER_X - totalWidth / 2;
    idsOrdered.forEach((id, idx) => {
      if (!posMap[id]) return;
      posMap[id].x = startX + idx * (NODE_WIDTH + H_GAP);
      posMap[id].y = START_Y + layer * LAYER_HEIGHT;
    });
  });

  // 生成节点
  Object.entries(posMap).forEach(([id, pos]) => {
    const node = nodeMap[id];
    nodes.push({
      id,
      data: { label: node.label },
      position: { x: pos.x, y: pos.y },
      style: {
        cursor: 'pointer',
        fontSize: pos.layer === 0 ? 22 : 18,
        fontWeight: pos.layer === 0 ? 700 : 600,
        borderRadius: 14,
        boxShadow: '0 0 18px #00eaff',
        background: pos.layer === 0 ? '#232942' : '#181f2a',
        color: '#fff',
        border: pos.layer === 0 ? '3px solid #00eaff' : '2px solid #00eaff',
        minWidth: 120,
        padding: 10,
      },
      type: undefined,
    });
  });

  // 生成连线
  Object.values(nodeMap).forEach(node => {
    if (node.next) node.next.forEach(childId => {
      edges.push({
        id: `${node.id}-${childId}`,
        source: node.id,
        target: childId,
        animated: true,
        style: { stroke: '#00eaff', strokeWidth: 2 },
        type: undefined,
      });
    });
  });

  return { nodes, edges };
}

const { nodes, edges } = buildLayout('root');

// 饼状进度条组件
const PieProgress: React.FC<{ percent: number }> = ({ percent }) => {
  const r = 16, stroke = 4, size = 40;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ display: 'block' }}>
      <circle cx={size/2} cy={size/2} r={r} stroke="#e6eaf2" strokeWidth={stroke} fill="none" />
      <circle
        cx={size/2}
        cy={size/2}
        r={r}
        stroke="#ff9800"
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - percent / 100)}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(.4,2,.6,1)' }}
      />
      <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" fontSize="13" fill="#fff" fontWeight="bold">
        {percent}%
      </text>
    </svg>
  );
};

// 自定义节点组件
const CustomNode: React.FC<NodeProps> = ({ data, id }) => {
  return (
    <div style={{ position: 'relative', width: NODE_WIDTH, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 16 }}>
      {/* 顶部连线端点 */}
      <Handle type="target" position={Position.Top} id={`${id}-t`} style={{ background: '#1890ff', border: 0 }} />
      {/* 节点 label 内容，右侧留出进度饼空间 */}
      <span style={{ paddingRight: 44, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: NODE_WIDTH - 44 }}>{data.label}</span>
      {/* 右下角饼状进度条，悬浮节点外侧 */}
      <div style={{ position: 'absolute', right: 4, bottom: 4, pointerEvents: 'none', background: 'transparent' }}>
        <PieProgress percent={typeof data.progress === 'number' ? data.progress : 0} />
      </div>
      {/* 底部连线端点 */}
      <Handle type="source" position={Position.Bottom} id={`${id}-b`} style={{ background: '#1890ff', border: 0 }} />
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

const FlowChartPage: React.FC = () => {
  const [hoverNodeId, setHoverNodeId] = useState<string | null>(null);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [form] = Form.useForm();

  // 处理节点 hover 事件
  const onNodeMouseEnter = useCallback<NodeMouseHandler>((_event, node) => {
    setHoverNodeId(node.id);
  }, []);
  const onNodeMouseLeave = useCallback(() => {
    setHoverNodeId(null);
  }, []);

  // 处理节点点击事件
  const onNodeClick = useCallback<NodeMouseHandler>((_event, node) => {
    if (NO_FORM_NODE_IDS.includes(node.id)) return;
    setActiveNodeId(node.id);
    form.resetFields();
  }, [form]);

  // 动态高亮相关节点
  const displayNodes = useMemo(() => {
    if (!hoverNodeId) return nodes;
    return nodes.map(node => {
      if (node.id === hoverNodeId) {
        return {
          ...node,
          style: {
            ...node.style,
            border: '4px solid #ffb300',
            boxShadow: '0 0 24px #ffb300',
            background: '#2d2d3a',
            opacity: 1,
            zIndex: 10,
          },
        };
      }
      return {
        ...node,
        style: {
          ...node.style,
          opacity: 0.5,
        },
      };
    });
  }, [nodes, hoverNodeId]);

  // 动态高亮相关连线
  const displayEdges = useMemo(() => {
    if (!hoverNodeId) return edges;
    return edges.map(edge => {
      if (edge.source === hoverNodeId || edge.target === hoverNodeId) {
        return {
          ...edge,
          style: { ...edge.style, stroke: '#ffb300', strokeWidth: 3 },
        };
      }
      return {
        ...edge,
        style: { ...edge.style, opacity: 0.5 },
      };
    });
  }, [edges, hoverNodeId]);

  function randomProgress() {
    return Math.floor(Math.random() * 101);
  }

  return (
    <ConfigProvider locale={zhCN}>
      <div style={{ width: '100vw', height: '100vh', background: 'radial-gradient(ellipse at center, #232942 0%, #0a0f1c 100%)' }}>
        <ReactFlow
          nodes={useMemo(() => displayNodes.map(n => ({
            ...n,
            type: 'custom',
            data: {
              ...n,
              ...n.data,
              progress: NO_PROGRESS_NODE_IDS.includes(n.id) ? 0 : randomProgress(),
            },
          })), [displayNodes])}
          edges={displayEdges}
          fitView
          panOnDrag={true}
          zoomOnScroll={true}
          zoomOnPinch={true}
          panOnScroll={true}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
        >
          <MiniMap nodeColor={() => '#00eaff'} maskColor="#232942" />
          <Controls />
          <Background color="#222" gap={16} />
        </ReactFlow>
        <Modal
          open={!!activeNodeId}
          title={activeNodeId ? nodeMap[activeNodeId].label : ''}
          onCancel={() => setActiveNodeId(null)}
          footer={null}
          destroyOnClose
          width={700}
          bodyStyle={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 32px #eaf6ff', border: '2px solid #1890ff', padding: 32 }}
        >
          {activeNodeId && (
            <Form
              form={form}
              layout="vertical"
              style={{ color: '#222' }}
              onFinish={() => setActiveNodeId(null)}
            >
              <Title level={4} style={{ color: '#1890ff', marginBottom: 24, textAlign: 'center', letterSpacing: 2 }}>{nodeMap[activeNodeId].label}</Title>
              <div style={{ border: '1.5px solid #1890ff', borderRadius: 12, padding: 24, background: '#fff', marginBottom: 16 }}>
                {nodeMap[activeNodeId].formFields.map(field => (
                  <Form.Item
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    rules={[{ required: true, message: `请输入${field.label}` }]}
                    style={{ marginBottom: 16 }}
                  >
                    {field.type === 'textarea' ? (
                      <Input.TextArea rows={field.label.length > 6 ? 4 : 2} style={{ fontSize: 18, borderRadius: 8, border: '1.5px solid #1890ff' }} />
                    ) : field.type === 'date' ? (
                      <DatePicker style={{ width: '100%', height: 48, fontSize: 18, borderRadius: 8, border: '1.5px solid #1890ff' }} format="YYYY年MM月DD日" />
                    ) : field.type === 'upload' ? (
                      <Upload listType="picture" maxCount={1}>
                        <Button icon={<UploadOutlined />} style={{ borderRadius: 8, border: '1.5px solid #1890ff', color: '#1890ff', background: '#fff' }}>上传图片</Button>
                      </Upload>
                    ) : (
                      <Input style={{ height: 48, fontSize: 18, borderRadius: 8, border: '1.5px solid #1890ff' }} />
                    )}
                  </Form.Item>
                ))}
              </div>
              <Form.Item>
                <Button type="primary" htmlType="submit" block style={{ background: '#1890ff', border: 'none', borderRadius: 24, height: 48, fontSize: 20 }}>提交</Button>
              </Form.Item>
            </Form>
          )}
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default FlowChartPage; 