// src/lib/animations.ts
import Animation from '../../assets/animations/empty-wallet.json';
import LoadingMain from '../../assets/animations/loading_main.json';
import NetworkError from '../../assets/animations/network_error.json';
import PulseLoader from '../../assets/animations/pulse_loader.json';
import ScanningLine from '../../assets/animations/scanning_line.json';
import SecurityScan from '../../assets/animations/security-scan.json';
import SuccessCheck from '../../assets/animations/success-check.json';
import SuccessBurst from '../../assets/animations/success_burst.json';
import TransactionSending from '../../assets/animations/transaction-sending.json';

// انیمیشن‌های Lottie اضافی
import BackgroundFlow from '../../assets/icons/lottie/background_flow.json';
import LoadingChart from '../../assets/icons/lottie/loading-chart.json';
import Loading from '../../assets/icons/lottie/loading.json';
import MatrixGlitch from '../../assets/icons/lottie/matrix_glitch.json';
import SuccessNeon from '../../assets/icons/lottie/success-neon.json';

export const animations = {
    // انیمیشن‌های اصلی
    emptyWallet: Animation,
    loadingMain: LoadingMain,
    networkError: NetworkError,
    pulseLoader: PulseLoader,
    scanningLine: ScanningLine,
    securityScan: SecurityScan,
    successCheck: SuccessCheck,
    successBurst: SuccessBurst,
    transactionSending: TransactionSending,
    
    // انیمیشن‌های اضافی
    backgroundFlow: BackgroundFlow,
    loadingChart: LoadingChart,
    loading: Loading,
    matrixGlitch: MatrixGlitch,
    successNeon: SuccessNeon,
};

export type AnimationKey = keyof typeof animations;