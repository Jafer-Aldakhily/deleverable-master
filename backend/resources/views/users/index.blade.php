@extends('./layout.master')


@section('content')

                <!-- Begin Page Content -->
                <div class="container-fluid">
                    <a class="btn btn-primary ml-1 mb-3" href="/admin/users/create">Add admin</a>
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">List of admins</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <div id="dataTable_wrapper" class="dataTables_wrapper dt-bootstrap4"><div class="row"><div class="col-sm-12 col-md-6"><div class="dataTables_length" id="dataTable_length"><label>Show <select name="dataTable_length" aria-controls="dataTable" class="custom-select custom-select-sm form-control form-control-sm"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries</label></div></div><div class="col-sm-12 col-md-6"><div id="dataTable_filter" class="dataTables_filter"></div></div></div><div class="row"><div class="col-sm-12"><table class="table table-bordered dataTable" id="dataTable" width="100%" cellspacing="0" role="grid" aria-describedby="dataTable_info" style="width: 100%;">
                                    <thead>
                                        <tr role="row"><th class="sorting sorting_asc" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style="width: 100px;">First Name</th><th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending" style="width: 100px;">Last Name</th><th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending" style="width: 200px;">Email</th><th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style="width: 100px;">Action</th></tr>
                                    </thead>
                                    <tfoot>
                                        <tr><th rowspan="1" colspan="1">First Name</th><th rowspan="1" colspan="1">Last Name</th><th rowspan="1" colspan="1">Email</th><th rowspan="1" colspan="1">Action</th></tr>
                                    </tfoot>
                                    <tbody>
                                        @foreach ($admins as $admin)
                                        <tr class="odd">
                                            <td class="sorting_1">{{ $admin->first_name }}</td>
                                            <td>{{ $admin->last_name }}</td>
                                            <td>{{ $admin->email }}</td>
                                            <td>
                                                <a class="btn btn-primary" href="/admin/users/{{ $admin->id }}/edit">Edit</a>
                                                <form action="/admin/users/{{ $admin->id }}" method="post" style="display: inline-block" onsubmit="return confirm('Are you sure you want to delete the admin?');">
                                                    @csrf
                                                    @method('DELETE')
                                                    <input type="hidden" value="{{ $admin->id }}" name="admin_id">
                                                    <input type="submit" 
                                                    name="submit" 
                                                    value="Delete" 
                                                    class="btn btn-danger"
                                                    >
                                                </form>
                                            </td>
                                        </tr>
                                        @endforeach       
                                    </tbody>
                                </table></div></div><div class="row"><div class="col-sm-12 col-md-5"><div class="dataTables_info" id="dataTable_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div></div><div class="col-sm-12 col-md-7"><div class="dataTables_paginate paging_simple_numbers" id="dataTable_paginate"><ul class="pagination">{!! $admins->links() !!}</ul></div></div></div></div>
                            </div>
                        </div>
                    </div>


                </div>
                <!-- /.container-fluid -->


    
@endsection