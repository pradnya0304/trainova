import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import api from '../../services/api'
import './Community.css'

const Community = () => {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ content: '', type: 'post', tags: '' })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    api.get('/community')
      .then(res => setPosts(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
      }
      const res = await api.post('/community', payload)
      setPosts([res.data, ...posts])
      setForm({ content: '', type: 'post', tags: '' })
      setShowForm(false)
      toast.success('Post shared!')
    } catch (err) {
      toast.error('Could not post')
    }
  }

  const handleLike = async (id) => {
    try {
      const res = await api.post(`/community/${id}/like`)
      setPosts(posts.map(p => p._id === id ? res.data : p))
    } catch (err) {
      toast.error('Could not like post')
    }
  }

  return (
    <div className="community-page">
      <Navbar />
      <div className="community-layout">
        <Sidebar />
        <main className="community-main">

          <div className="community-header animate-fade-in">
            <div>
              <h1 className="section-title">Community</h1>
              <p className="section-subtitle">Share your progress, ask questions and support each other</p>
            </div>
            <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancel' : '+ New Post'}
            </button>
          </div>

          {showForm && (
            <div className="card animate-slide-down">
              <h3 className="card-section-title">Share with the community</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Post Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    <option value="post">General Post</option>
                    <option value="progress">Progress Update</option>
                    <option value="question">Question</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Content</label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="Share your thoughts, progress or ask a question..."
                    rows={4}
                    style={{ resize: 'vertical', width: '100%', padding: '12px 16px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '14px' }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tags (comma separated)</label>
                  <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="muscle gain, beginner, chest" />
                </div>
                <button type="submit" className="btn-primary">Post</button>
              </form>
            </div>
          )}

          {loading ? (
            <div className="spinner" style={{ margin: '40px auto' }}></div>
          ) : posts.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
              No posts yet. Be the first to share.
            </div>
          ) : (
            <div className="posts-list animate-fade-in">
              {posts.map(post => (
                <div key={post._id} className="post-card card">
                  <div className="post-header">
                    <div className="post-avatar">
                      {post.user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="post-author">{post.user?.name || 'User'}</p>
                      <p className="post-date">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`badge post-type-badge ${post.type === 'question' ? 'badge-blue' : post.type === 'progress' ? 'badge-green' : 'badge-purple'}`}>
                      {post.type}
                    </span>
                  </div>

                  <p className="post-content">{post.content}</p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="post-tags">
                      {post.tags.map((tag, i) => (
                        <span key={i} className="post-tag">{tag}</span>
                      ))}
                    </div>
                  )}

                  <div className="post-actions">
                    <button
                      className={`post-like-btn ${post.likes?.includes(user?._id) ? 'liked' : ''}`}
                      onClick={() => handleLike(post._id)}
                    >
                      {post.likes?.includes(user?._id) ? '&#9829;' : '&#9825;'} {post.likes?.length || 0}
                    </button>
                    <span className="post-comments-count">{post.comments?.length || 0} comments</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default Community