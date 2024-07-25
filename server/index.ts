import express from 'express';
import authRoutes from './routes/authRoutes';
import session from 'express-session';
import passport from 'passport';
import stateRoutes from './routes/stateRoutes';
import { connectDB } from './configs/db';

const app = express();

app.use(express.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.use('/auth', authRoutes);
app.use('/api', stateRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});