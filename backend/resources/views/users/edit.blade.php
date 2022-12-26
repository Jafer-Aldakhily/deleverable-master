@extends('./layout.master')


@section('content')

                <!-- Begin Page Content -->
                <div class="container-fluid">
                  <h1>Edit new admin</h1>
                  <form  method="POST" action="/admin/users/{{ $admin->id }}" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    <div class="row mt-5 mx-5">
                        <div class="col-11">
                            {{-- first row --}}
                            <div class="row">
                                <div class="col-6">
                                    {{-- first name --}}
                                    <div class="form-group">
                                        <label for="first_name">First Name</label>
                                        <input type="text" class="form-control" id="first_name" aria-describedby="first_name"
                                            placeholder="Your First Name"  name="first_name" value={{ $admin->first_name }}>
                                              @error('first_name')
                                              <span class="text-small text-danger">{{ $message }}</span>
                                              @enderror
                                    </div>
                                </div>
                                <div class="col-6">
                                    {{-- last name --}}
                                    <div class="form-group">
                                        <label for="last_name">Last Name</label>
                                        <input type="text" class="form-control" id="last_name" aria-describedby="last_name"
                                            placeholder="Your Last Name"  name="last_name" value={{ $admin->last_name }}>
                                              @error('last_name')
                                              <span class="text-small text-danger">{{ $message }}</span>
                                              @enderror
                                    </div>
                                </div>
                            </div>

                            {{-- second row --}}
                            <div class="row">
                                <div class="col-6">
                                    {{-- email --}}
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                            placeholder="Enter email"  name="email" value={{ $admin->email }}>
                                            @error('email')
                                            <span class="text-small text-danger">{{ $message }}</span>
                                            @enderror
                                    </div>
                                </div>
                                <div class="col-6">
                                    {{-- image --}}
                              <div class="form-group">
                                <label for="image">Upload image</label>
                                <input type="file" class="form-control" id="image" aria-describedby="image"
                                     name="image">
                                     <img style="height: 50px; width:50px" 
                                        src="/images/{{ $admin->admin_image }}"
                                        class="m-1 img-fluid rounded-circle" alt="">
                                      @error('image')
                                      <span class="text-small text-danger">{{ $message }}</span>
                                      @enderror
                            </div>
                                </div>
                            </div>

                            {{-- third row --}}
                            <div class="row">
                                <div class="col-12">
                                    {{-- admin_type --}}
                                    <div class="form-group">
                                        <label for="admin_type">Admin type</label>
                                        <select name="admin_type"  class="form-control">
                                            <option>Select type</option>
                                            <option value="super_admin" {{ $admin->admin_type == 'super_admin' ? 'selected' : '' }}>Super Admin</option>
                                            <option value="sup_admin" {{ $admin->admin_type == 'sup_admin' ? 'selected' : '' }}>Sup Admin</option>
                                        </select>
                                              @error('admin_type')
                                              <span class="text-small text-danger">{{ $message }}</span>
                                              @enderror
                                    </div>
                                </div>
                            </div>
          
                              <button type="submit" class="btn  btn-primary">Submit</button>
                            </div>
                        </form>
                         
                    </div>

                </div>
                <!-- /.container-fluid -->


    
@endsection