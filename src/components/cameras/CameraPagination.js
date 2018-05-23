import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Pagination,
  PaginationItem,
  PaginationLink } from 'reactstrap';

class CameraPagination extends Component {

  render(){

    let pageIndicators = [];
    for (let i=1; i <= this.props.pages; i++) {
        pageIndicators.push(
          <PaginationItem key={i} active={this.props.currentPage == i}>
            <Link
              to={'?page='+i+'&limit='+this.props.limit}
              className="page-link"
              onClick={() => this.props.clicked(i, this.props.limit)}>{i}</Link>
          </PaginationItem>
        )
    }

    return (
      <Pagination size="md" className="pull-right">
        {pageIndicators}
      </Pagination>
    )
  }
}

export default CameraPagination;
