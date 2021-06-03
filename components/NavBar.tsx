import Link from 'next/link'

interface User {
    photoURL?: string;
}

const NavBar: React.FC = () => {
    const {user, username}: {user: User, username: string} = {user: {}, username: ''}
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link href='/'>
                        <button className="btn-logo">FEED</button>
                    </Link>
                </li>
                {username && (
                    <>
                        <li className="push-left">
                            <Link href='/admin'>
                                <button className="btn-blue">Write Posts</button>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${username}`}>
                                <img src={user?.photoURL} alt="Profile" />
                            </Link>
                        </li>
                    </>
                )}
                {!username && (
                    <li>
                        <Link href='/enter'>
                            <button className="btn-blue">Log in</button>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default NavBar