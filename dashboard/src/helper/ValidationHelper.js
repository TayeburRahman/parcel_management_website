import toast from "react-hot-toast";

class ValidationHelper {
    SuccessToast(msg) {
        toast.success(msg);
    }

    ErrorToast(msg) {
        toast.error(msg);
    }

    WarningToast(msg) {
        toast(msg, {
            icon: '⚠️',
            style: {
                background: '#fff3cd',
                color: '#856404',
                border: '1px solid #ffeeba',
            },
        });
    }
}

export const { SuccessToast, ErrorToast, WarningToast } = new ValidationHelper();