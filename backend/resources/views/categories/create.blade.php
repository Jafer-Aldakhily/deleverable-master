@extends('./layout.master')


@section('content')

                <!-- Begin Page Content -->
                <div class="container-fluid">
                  <h1>Add new category</h1>
                  <form  method="POST" action="/admin/categories" enctype="multipart/form-data">
                    @csrf
                    <div class="row mt-5 mx-5">
                        <div class="col-11">
                            {{-- first row --}}
                            <div class="row">
                                <div class="col-8">
                                    {{-- first name --}}
                                    <div class="form-group">
                                        <label for="name">Category Name</label>
                                        <input type="text" class="form-control" id="name" aria-describedby="name"
                                            placeholder="Your Category Name"  name="name" value="{{old('name')}}"
>
                                              @error('name')
                                              <span class="text-small text-danger">{{ $message }}</span>
                                              @enderror
                                    </div>
                                </div>
                            </div>

                            {{-- second row --}}
                            <div class="row">
                                <div class="col-8">
                                    {{-- email --}}
                                    <div class="form-group">
                                        <label for="image">Upload Image</label>
                                        <input type="file" class="form-control" id="image" aria-describedby="image"  name="image">
                                            @error('image')
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