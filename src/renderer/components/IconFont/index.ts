import { Icon } from 'antd';
import defaultSettings from '../../defaultSettings';
import { IconProps } from 'antd/lib/icon';

// 使用：
// import IconFont from '@/components/IconFont';
// <IconFont type='icon-demo' className='xxx-xxx' />
const { iconfontUrl: scriptUrl } = defaultSettings;
const IconFont: React.SFC<IconProps> = Icon.createFromIconfontCN({ scriptUrl });
export default IconFont;
