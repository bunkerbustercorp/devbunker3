const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const { generateToken } = require('lib/token');

function hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const Account = new Schema({
    profile: {
        username: String,
        thumbnail: { type: String, default: '/static/images/default_thumbnail.png' }
    },
    email: { type: String },

    // 소셜 계정으로 회원가입을 할 경우에는 각 서비스에서 제공되는 id와 accessToken을 저장합니다.
    social: {
        facebook: {
            id: String,
            accessToken: String
        },
        google: {
            id: String,
            accessToken: String
        }
    },
    password: String, // 로컬계정의 경우엔 비밀번호를 해싱해서 저장합니다.
    thoughtCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

Account.statics.findByUsername = function(username) {
    // 객체에 내장되어 있는 값을 사용 할 때는 객체명, 키 이런식으로 쿼리하면 됩니다.
    return this.findOne({'profile.username': username}).exec();
};

Account.statics.findByEmail = function(email) {
    return this.findOne({email}).exec();
};

Account.statics.findByEmailOrUsername = function({username, email}) {
    return this.findOne({
        // $or 연산자를 통해 둘 중에 하나를 만족하는 데이터를 찾습니다.
        $or: [
            { 'profile.username': username },
            { email }
        ]
    }).exec();
};

Account.statics.localRegister = function({ username, email, password }) {
    // 데이터를 생성 할 때는 new this()를 사용합니다.
    const account = new this({
        profile: {
            username
            // thumbnail 값을 설정하지 않으면 기본값으로 설정합니다.
        },
        email,
        password: hash(password)
    });

    return account.save();
};

Account.methods.validatePassword = function(password) {
    // 함수로 전달 받은 password의 해시값과, 데이터에 담겨있는 해시값을 비교합니다.
    const hashed = hash(password);
    return this.password === hashed;
}

Account.methods.generateToken = function() {
    // JWT에 담을 내용
    const payload = {
        _id: this._id,
        profile: this.profile
    };

    return generateToken(payload, 'account');
};

module.exports = mongoose.model('Account', Account);