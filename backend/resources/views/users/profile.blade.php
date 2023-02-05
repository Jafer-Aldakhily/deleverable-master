@extends('./layout.master')


@section('content')

        @php
            $admin = \App\Models\Admin::find(1);  
        @endphp

        {{-- @if ($success)
            <div class="alert alert-success">{{ $success }}</div>
        @endif --}}

                <!-- Begin Page Content -->
                <div class="container-fluid">

                    <section class="about-section section-padding">
                        <div class="container">
                            <div class="row d-flex justify-content-center align-items-start ">
                                <div class="col-lg-4 col-md-4 col-12 text-center ">
                                    {{-- <img style="object-fit: cover ; height: 250px;" width="250px"
                                        src="/images/{{ auth()->guard('admin')->user()->admin_image }} "
                                        class="ms-lg-auto bg-light shadow-lg img-fluid rounded-circle" alt=""> --}}
                                    {{-- <img style="object-fit: cover ; height: 250px;" width="250px"
                                        src="/images/{{ $admin->admin_image }} "
                                        class="ms-lg-auto bg-light shadow-lg img-fluid rounded-circle" alt=""> --}}
                                        @if ($admin?->admin_image)
                                        @if (str_starts_with($admin?->admin_image,"http"))
                                        <img style="object-fit: cover ; height: 250px;" width="250px"
                                        src="{{ $admin->admin_image }} "
                                        class="ms-lg-auto bg-light shadow-lg img-fluid rounded-circle" alt="">
                                        @else
                                        <img style="object-fit: cover ; height: 250px;" width="250px"
                                        src="/images/{{ $admin->admin_image }} "
                                        class="ms-lg-auto bg-light shadow-lg img-fluid rounded-circle" alt="">    
                                        @endif
                                        {{-- @if (auth()->guard('admin')->user()?->admin_image) --}}
                                        {{-- <img class="img-profile rounded-circle"
                                        src="/images/{{ auth()->guard('admin')->user()->admin_image }}"> --}}
                                        @endif
                                    <div>
                                        <form action="{{ route('updateAvatar') }}" method="POST" id="form" role="form" enctype="multipart/form-data">
                                            @csrf
                                            @method('PUT')
                                            <input type="hidden" name="admin_id" value="{{ $admin->id }}">
                                            <input type="file" name="image" id="selectedFile" style="display: none;" />
                                            <input type="button" class="btn  btn-outline-dark mt-3" value="Update Profile picture"
                                                onclick="document.getElementById('selectedFile').click(); " />
                                            <script>
                                                document.getElementById("selectedFile").onchange = function() {
                                                    document.getElementById("form").submit();
                                                    };
                                            </script>
                                        </form>
                                    </div>
                                </div>
                    
                                <div class="col-lg-8 col-md-8 col-12 " style="border-left:1px rgb(162, 162, 162) solid; padding-left:4rem">
                    
                                    <div class=" d-flex flex-column align-items-start justify-content-center pt-5 ">
                                        {{-- Note that h2 wrote it to write a dynamic username --}}
                                        {{-- <h2 style="text-transform: capitalize">{{ auth()->guard("admin")->user()->username }}</h2> --}}
                                        <h2 style="text-transform: capitalize">{{ $admin?->username }}</h2>
                                        {{-- <h6> <b> Email: </b> {{ auth()->guard("admin")->user()->email }}</h6> --}}
                                        <h6> <b> Email: </b> {{ $admin?->email }}</h6>
                                        {{-- <h6> <b> First Name: </b> {{ auth()->guard("admin")->user()->first_name }} </h6> --}}
                                        <h6> <b> First Name: </b> {{ $admin?->first_name }} </h6>
                                        {{-- <h6> <b> Last Name: </b> {{ auth()->guard("admin")->user()->last_name }}</h6> --}}
                                        <h6> <b> Last Name: </b> {{ $admin?->last_name }}</h6>
                                        {{-- <h6> <b> Joined at: </b> {{ auth()->guard("admin")->user()->created_at->format('d-m-y') }} </h6> --}}
                                        <h6> <b> Joined at: </b> {{ $admin?->created_at->format('d-m-y') }} </h6>
                                    </div>
                    
                                    <div class="col-lg-3 col-md-3 col-12 d-none d-md-block  ">
                                        <h3 class="custom-text-block d-flex justify-content-end"> <a href="/editProfile"><i
                                                    class="bi bi-gear-fill "></i></a></h3>
                    
                                    </div>
                    
                                    <hr class=" mt-5">
                    
                    
                                </div>
                            </div>
                    
                            {{-- update information --}}
                            <hr class="my-5">
                            <div class="row">
                                <div class=" col-6  d-flex ">
                                    <form class="pr-5 w-100 mb-5" style="border-right:1px solid gray" method="POST" action="{{ route('updateAdmin') }}">
                                        @csrf
                                        @method('PUT')
                                        {{-- first name --}}
                                        <input type="hidden" name="admin_id" value="{{ $admin->id }}">
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">First Name</label>
                                            {{-- <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                                placeholder="Your Name" value="{{ auth()->guard("admin")->user()->first_name }}" name="first_name"> --}}
                                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                                placeholder="Your Name" value="{{ $admin->first_name }}" name="first_name">
                                        </div>
                                        {{-- <span class="error text-danger"></span> --}}
                                        {{-- last name --}}
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Last Name</label>
                                            {{-- <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                                placeholder="Your Name" value="{{ auth()->guard("admin")->user()->last_name }}" name="last_name"> --}}
                                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                                placeholder="Your Name" value="{{ $admin?->last_name }}" name="last_name">
                                        </div>
                                        {{-- <span class="error text-danger"></span> --}}
                                        {{-- email --}}
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Email address</label>
                                            {{-- <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                                placeholder="Enter email" value="{{ auth()->guard("admin")->user()->email }}" name="email"> --}}
                                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                                placeholder="Enter email" value="{{ $admin?->email }}" name="email">
                                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
                                                else.</small>
                                        </div>
                                        {{-- Any error danger for error --}}
                                        {{-- <span class="error text-danger"></span> --}}
                                        {{-- <span class="error text-danger">error</span> --}}
                    
                                        <button type="submit" class="btn  btn-primary">Submit</button>
                                    </form>
                                </div>
                    
                                {{-- password form --}}
                    
                                <div class=" col-6  d-flex ">
                                    <form class="w-100 pr-5 mt-1" action="{{ route('updatePassword') }}" method="post" role="form">
                                        @csrf
                                        @method('PUT')
                                        <input type="hidden" name="admin_id" value="{{ $admin->id }}">
                                        {{-- old pass --}}
                                        <div class="form-group">
                                            <label for="password">Old Password</label>
                                            <input type="password" name="password_current" id="password" class="form-control"
                                                placeholder="current Password" value="{{ old('password_current') }}"
                                                required
                                                >
                                                @error('password_current')
                                                <span class="text-small text-danger">{{ $message }}</span>
                                                @enderror
                                        </div>
                                        {{-- new --}}
                                        <div class="form-group">
                                            <label for="new_password">New Password</label>
                                            <input type="password" name="password_new" id="password_new" class="form-control"
                                                placeholder="New Password" value="{{ old('password_new') }}"
                                                required
                                                >
                                                @error('password_new')
                                                <span class="text-small text-danger">{{ $message }}</span>
                                                @enderror
                                        </div>
                    
                                        {{-- confirm --}}
                                        <div class="form-group">
                                            <label for="password_confirmation">Confirm Password</label>
                                            <input type="password" name="password_confirmation" id="password_confirmation"
                                                class="form-control" placeholder="Confirm Your Password"
                                                value="{{ old('password_confirmation') }}"
                                                required
                                                >
                                        </div>
                                        @error('password_confirmation')
                                        <span class="text-small text-danger">{{ $message }}</span>
                                        @enderror
                    
                                        <button type="submit" class="btn  btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                    
                    
                    
                    
                        </div>
                    </section>

                </div>
                <!-- /.container-fluid -->


    
@endsection