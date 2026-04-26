import mysql from'mysql2';

const userSchema  = mysql.Schema({
    id: {
        type: mysql.Types.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: mysql.Types.VARCHAR(255),
        allowNull: false       
    },
    content: {
        type: mysql.Types.TEXT,
        allowNull: false
    },
    createdAt: {
        type: mysql.Type.DATE,
        defaultValue: mysql.NOW
    }
});

const User = mysql.model('User', userSchema);
export default User;