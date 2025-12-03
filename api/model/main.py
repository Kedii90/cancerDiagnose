import torch
from model_vgg import vgg, z_score
import numpy as np
import sys
import json
import os
import matplotlib.pyplot as plt
def get_resource_path(relative_path):
    """ 获取打包后的资源绝对路径 """
    if hasattr(sys, '_MEIPASS'):
        return os.path.join(sys._MEIPASS, relative_path)
    return os.path.join(os.path.abspath("."), relative_path)

def wavedrawpic(file_path):
    # 使用传入的完整文件路径
    data = np.loadtxt(file_path, delimiter='\t')
    wavenumbers = np.linspace(500, 2000, len(data))
    plt.figure(figsize=(10, 6))
    plt.plot(wavenumbers, data)
    plt.title("Raman Spectrum")
    plt.xlabel("Wavenumber (cm⁻¹)")
    plt.ylabel("Intensity")
    plt.grid(True)
    # 保存图片到与上传文件相同的目录（api 目录）
    # 从文件路径推导 api 目录：如果文件在 api/uploads/，则图片应该保存在 api/ 目录
    uploads_dir = os.path.dirname(file_path)  # api/uploads
    api_dir = os.path.dirname(uploads_dir)  # api
    image_path = os.path.join(api_dir, 'Raman Spectrum.jpg')
    plt.savefig(image_path)
    return image_path


def predict(file_path):
    device = 'cpu'
    net = vgg(num_classes=2, init_weights=True)
    net.to(device='cpu')
    weights_path = get_resource_path("VGG16.pth")
    net.load_state_dict(torch.load(weights_path, map_location=device))
    net.eval()
    # 使用传入的完整文件路径，而不是硬编码路径
    input_data = np.loadtxt(file_path, delimiter='\t')
    input_data = z_score(input_data)

    test_x = torch.tensor(input_data, dtype=torch.float32)
    test_x = torch.unsqueeze(test_x, dim=0)
    test_x = torch.unsqueeze(test_x, dim=0)
    outputs = net(test_x.to(device))
    predict_y = torch.max(outputs, dim=1)[1]
    image_path = wavedrawpic(file_path)
    # 返回JSON格式结果
    result = {
        "is_cancer": bool(predict_y > 0.5),
        "message": "这是一个肝癌组织。" if predict_y > 0.5 else "这不是一个肝癌组织。",
        "confidence": float(torch.sigmoid(outputs)[0][1].item()),
        "image_path": image_path  # 返回图片路径供后端使用
    }
    print(json.dumps(result))  # 输出JSON到stdout


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "缺少文件路径参数"}))
        sys.exit(1)

    file_path = sys.argv[1]  # 从命令行参数获取完整的文件路径
    # 验证文件是否存在
    if not os.path.exists(file_path):
        print(json.dumps({"error": f"文件不存在: {file_path}"}))
        sys.exit(1)
    
    predict(file_path)


