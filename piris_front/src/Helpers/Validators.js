const validators = {
    nameSurnameMiddlename: (val) => {
        return /^([а-яА-Яa-zA-Z].*?)?$/.test(val);
    },
    passportSeria: (val) => {
        return /^[а-яА-Яa-zA-Z]{0,2}$/.test(val);
    },
    passportNumber: (val) => {
        return /^\d{0,7}$/.test(val);
    },
    passportIdentityNumber: (val) => {
        return /^(\d{1,7}([а-яА-Яa-zA-Z](\d{1,3}([а-яА-Яa-zA-Z]{1,2}(\d)?)?)?)?)?$/.test(val);
    },
    homePhone: (val) => {
        return /^\d{0,8}$/.test(val);
    },
    mobilePhone: (val) => {
        return /^(([+]\d{0,12})|(\d{0,11}))$/.test(val);
    },
    email: (val) => {
        return /^\S*?@?\S*?[.]?\w{0,3}$/.test(val);
    },
    monthIncome: (val) => {
        return val >= 0;
    }
};

export default validators;