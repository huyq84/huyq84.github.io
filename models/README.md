# 三维模型存放目录

此目录用于存放Three.js支持的所有三维模型格式。

## 支持的格式

- **GLTF/GLB** (.gltf, .glb) - 推荐格式，支持动画和材质
- **OBJ** (.obj) - 几何体模型
- **FBX** (.fbx) - 包含动画的模型
- **3DS** (.3ds) - 3D Studio格式
- **STL** (.stl) - 3D打印格式
- **PLY** (.ply) - 点云和网格格式
- **Collada** (.dae) - 通用3D格式
- **USDZ** (.usdz) - Apple AR格式

## 使用说明

1. 将模型文件放入此目录
2. 在ThreeDModel组件中引用模型路径
3. 确保模型文件大小合理（建议<50MB）
4. 为模型提供预览图（可选）

## 目录结构

```
public/models/
├── README.md
├── villa/
│   ├── villa.glb
│   ├── villa.gltf
│   └── villa.jpg
├── materials/
│   ├── concrete.glb
│   └── wood.glb
└── equipment/
    ├── hvac.glb
    └── electrical.glb
```

## 注意事项

- 模型文件应进行优化以减少加载时间
- 建议使用GLB格式以获得最佳性能
- 大文件建议使用CDN或云存储
- 确保模型比例正确（1单位 = 1米）