import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'; // Import Bootstrap components
import { fetchArticles } from '../../redux/action';
import { connect } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const Articles = ({articles, fetchArticles}) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState(false)
    const token = localStorage.getItem('token');
    const config = { headers: {"Authorization" : `Bearer ${token}`} }
    
    useEffect(() => {
      if (search) {
        const timer = setTimeout(() => {
          getArticles(search);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        getArticles(search);
      }
    },[search, sort]);

    const getArticles = async (search) => {
        try {
          const paramStr = `sort=createdAt&sortDirection=${sort ? -1 : 1}`
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/article/get-articles?search=${search ? search : ''}&${paramStr}`, config);
          if(response?.data?.status){
            fetchArticles(response?.data?.data)
          } else {
            toast.error(response?.data?.message)
          }          
        } catch (error) {
          toast.error(error)
        }
    };

    const handleAddEdit = (title, data) => {
      if(title === 'Add Article') {
        navigate('/add-article', { state: {title} })
      } else {
        navigate('/edit-article', { state: { title, data } })

      }
    };

    const showConfirmationBox = (id) =>{
      Swal.fire({
        title: "Are you sure you want to delete article?",
        showCancelButton: true,
        confirmButtonText: "Yes, I'm sure",
      }).then((result) => {
        if (result.isConfirmed) {
          handleDeleteArticles(id)
        }
      });
    }

    const handleDeleteArticles = async (id) => {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/article/delete-article/${id}`, config);
        if(response?.data?.status){
          getArticles()
          toast.success(response?.data?.message)
        } else {
          toast.error(response?.data?.message)
        }          
      } catch (error) {
        toast.error(error)
      }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        
        <div className="col-md-12 d-flex justify-content-end">
          <input
            type='text'
            className='form-control m-1 w-25'
            placeholder='Search...'
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="d-flex align-items-center m-1">
            <input type='checkbox' onChange={(e) => setSort(e.target.checked)} /> 
            <label className='ml-2 mb-0'>Sort Articles</label>
          </div>
          <Button
            className='ml-2'
            variant="primary"
            onClick={() => handleAddEdit('Add Article')}
          >
            Add New Article
          </Button>
        </div>

      </div>
      <div className="row mt-4">
        {articles.length > 0 && articles.map(article => (
          <div key={article.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text"><b>Category:</b> {article.category}</p>
                <p className="card-text">{article.description}</p>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-link p-0 me-3"
                    onClick={() => {handleAddEdit('Edit Article', article);}}
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-link p-0"
                    onClick={() => showConfirmationBox(article._id)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* { showAddEditArticle && 
        <AddEditArticle 
          title={title} 
          data={addEditArticle} 
        /> 
      } */}
    </div>
  );
};

function mapStateToProps(state) {
  return { articles: state.articleReducer.articles }
}

const mapDispatchToProps = {
  fetchArticles
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles)