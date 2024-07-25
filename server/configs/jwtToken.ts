import jwt from 'jsonwebtoken';

const token = (id: string): string => {
    return jwt.sign({ id }, 'anscerrobotics', { expiresIn: '1d' });
};

export default token;