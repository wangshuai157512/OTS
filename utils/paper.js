const isAnswerPaperState = flag => {
    if (typeof flag != 'undefined' && flag == 1) {
        return {
            msg : '答题次数超过规定次数',
            isAnswer : false
        }
    } else if (typeof flag != 'undefined' && flag == 2) {
        return {
            msg : '考试未开始',
            isAnswer : false
        }
    } else if (typeof flag != 'undefined' && flag == 3) {
        return {
            msg : '考试已结束',
            isAnswer : false
        }
    } else if (typeof flag != 'undefined' && flag == 3) {
        return {
            msg : '考试已结束',
            isAnswer : false
        }
    } else if (typeof flag != 'undefined' && flag == 4) {
        return {
            msg : '您没有权限参加本考试',
            isAnswer : false
        }
    } else if (typeof flag != 'undefined' && flag == 5) {
        return {
            msg : '上次答卷评阅后，才能再次作答',
            isAnswer : false
        }
    } else if (typeof flag != 'undefined' && flag == 6) {
        return {
            msg : '您已通过考试',
            isAnswer : false
        }
    } else if (typeof flag != 'undefined' && flag == 7) {
        return {
            msg : '您的请求非法，请从正确途径进入作答',
            isAnswer : false
        }
    } else if (typeof flag != 'undefined' && flag == 8) {
        return {
            msg : '您的身份验证照片未上传，请上传后考试',
            isAnswer : false
        }
    } else if (typeof flag != 'undefined' && flag == 9) {
        return {
            msg : '考试活动已经停用',
            isAnswer : false
        }
    } else if (typeof flag != 'undefined' && flag == 10) {
        return {
            msg : '请使用客户端作答',
            isAnswer : false
        }
    } else if (typeof flag != 'undefined' && flag == 11) {
        return {
            msg : '重复进入考试，请稍后再试',
            isAnswer : false
        }
    } else {
        return {
            isAnswer : true
        }
    }
}

export default {
    isAnswerPaperState
}
